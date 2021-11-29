import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { Employee } from "../../..";
import { EmployeeJSON } from "../../../employees";
import {
  serializedEmployeeMockData,
  employeeMockData,
} from "../../../employees/fixtures";
import { employeeStoreManager } from "../../../employees/mocks";
import { employeeSkillsStoreManager } from "../../../employee_skills/mocks";
import { projectStoreManager } from "../../../projects/mocks";
import { skillStoreManager } from "../../../skills/mocks";
import useEmployees from "../../../useEmployees";
import hydrateObject from "../../hydrateObject";
import { wrapper } from "../../useRest.test";
import jsonApiMiddleware from "./jsonApiMiddleware";

describe("json-api-deserializer middleware", () => {
  beforeAll(async () => {
    await employeeStoreManager.load();
    await projectStoreManager.load();
    await skillStoreManager.load();
    await employeeSkillsStoreManager.load();
  });

  afterAll(async () => {
    await employeeStoreManager.clear();
    await projectStoreManager.clear();
    await skillStoreManager.clear();
    await employeeSkillsStoreManager.clear();
  });

  it("works", async () => {
    const { employees: frontEndShapeDeserialized } = employeeMockData();
    const [deserializedResults, relationships] = jsonApiMiddleware(
      serializedEmployeeMockData,
      "employees",
    );

    if (frontEndShapeDeserialized) {
      expect(deserializedResults.data[0].skills).toEqual(
        frontEndShapeDeserialized[0].skills,
      );
    }
    // No additional data fields to hydrate, given the response object
    // has an included field
    expect(relationships).toHaveLength(0);
  });

  it("Builds relationships array", () => {
    const newReturnedEmployee = {
      data: {
        type: "employees",
        id: "100",
        attributes: {
          name: "Johnny Appleseed",
          startDate: new Date(),
          endDate: "",
        },
        relationships: {
          skills: {
            data: [
              {
                type: "skills",
                id: "101",
              },
              {
                type: "skills",
                id: "102",
              },
            ],
          },
        },
      },
    };

    const [, relationships] = jsonApiMiddleware(
      newReturnedEmployee,
      "employees",
    );
    // POST employees have a relationship field, "skills", whose array
    // values need information from a skillStore fetch
    expect(relationships).toHaveLength(1);
    expect(relationships).toContain("skills");
  });

  it("Hydrates relationships fields on new entry", async () => {
    const newReturnedEmployee = {
      data: {
        type: "employees",
        id: "100",
        attributes: {
          name: "Johnny Appleseed",
          startDate: new Date(),
          endDate: "",
        },
        relationships: {
          skills: {
            data: [
              {
                type: "skills",
                id: "101",
              },
              {
                type: "skills",
                id: "102",
              },
            ],
          },
        },
      },
    };

    const [deserializedResults, relationships] = jsonApiMiddleware(
      newReturnedEmployee,
      "employees",
    );
    const hydratedDeserialized = await hydrateObject<{ data: Employee }>(
      deserializedResults,
      relationships,
    );
    // relationship field "skills" of POST employee value objects have been hydrated with "name"
    // field
    expect(hydratedDeserialized.data.skills).toHaveLength(2);
    expect(hydratedDeserialized.data.skills).toEqual([
      { id: "101", name: "Angular" },
      { id: "102", name: "Design" },
    ]);
  });

  it("Adds employee and hydrates skills fields", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper,
    });

    await waitForNextUpdate();
    const newEmployee: { data: Omit<EmployeeJSON, "id"> } = {
      data: {
        type: "employees",
        attributes: {
          name: "Johnny Appleseed",
          startDate: new Date(),
          endDate: new Date(),
        },
        relationships: {
          skills: {
            data: [
              {
                type: "skills",
                id: "101",
              },
              {
                type: "skills",
                id: "102",
              },
            ],
          },
        },
      },
    };
    // Functionality works integrated with employees hook
    result.current.addEmployee(newEmployee);
    await waitFor(() =>
      expect(
        result.current.employees
          ?.filter((employee) => employee.name === "Johnny Appleseed")
          .map((employee) => employee.skills)[0],
      ).toEqual([
        { id: "101", name: "Angular" },
        { id: "102", name: "Design" },
      ]),
    );
  });
});

export {};
