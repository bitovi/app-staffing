import { render } from "@testing-library/react";
import RoleCard from "./RoleCard";
import { roles } from "../../../../mocks/fixtures";
import { Table, Tbody } from "@chakra-ui/react";
import cloneDeep from "lodash/cloneDeep";

describe("Pages/Projects/components/RoleCard", () => {
  it("shows assignments with no end date", () => {
    const role = cloneDeep(roles[0]);
    if (role?.assignments?.[0]) {
      role.assignments[0].endDate = undefined;
    }

    const { getByTestId } = render(
      <Table>
        <Tbody>
          <RoleCard
            role={role}
            handleDeleteRole={() => undefined}
            handleEditRole={() => undefined}
          />
        </Tbody>
      </Table>,
    );

    const assignmentColumn = getByTestId("assignments-column");

    expect(assignmentColumn.innerHTML).toBe(
      role?.assignments?.[0].employee.name,
    );
  });

  it("shows assignments with end date higher than now", () => {
    const role = cloneDeep(roles[0]);
    if (role?.assignments?.[0]) {
      const dateOffset = 24 * 60 * 60 * 1000 * 5;
      const endDate = new Date();
      endDate.setTime(new Date().getTime() + dateOffset);
      role.assignments[0].endDate = endDate;
    }

    const { getByTestId } = render(
      <Table>
        <Tbody>
          <RoleCard
            role={role}
            handleDeleteRole={() => undefined}
            handleEditRole={() => undefined}
          />
        </Tbody>
      </Table>,
    );

    const assignmentColumn = getByTestId("assignments-column");

    expect(assignmentColumn.innerHTML).toBe(
      role?.assignments?.[0].employee.name,
    );
  });

  it("does not show assignments with end date lower than now", () => {
    const role = cloneDeep(roles[0]);
    if (role?.assignments?.[0]) {
      const dateOffset = 24 * 60 * 60 * 1000 * 5;
      const endDate = new Date();
      endDate.setTime(new Date().getTime() - dateOffset);
      role.assignments[0].endDate = endDate;
    }

    const { getByTestId } = render(
      <Table>
        <Tbody>
          <RoleCard
            role={role}
            handleDeleteRole={() => undefined}
            handleEditRole={() => undefined}
          />
        </Tbody>
      </Table>,
    );

    const assignmentColumn = getByTestId("assignments-column");

    expect(assignmentColumn.innerHTML).not.toBe(
      role?.assignments?.[0].employee.name,
    );
  });
});
