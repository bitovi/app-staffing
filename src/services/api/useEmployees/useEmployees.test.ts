// import { act } from "@testing-library/react-hooks";
// import { renderHook } from "../../../testUtils";
// import { employees } from "../employees/fixtures";
// import { employeeStoreManager } from "../employees/mocks";
// import { skillList } from "../shared";
// import useEmployees from "./useEmployees";

// const [react] = skillList;

// describe("useEmployees", () => {
//   beforeEach(async () => {
//     await employeeStoreManager.loadResources();
//   });

//   afterEach(async () => {
//     await employeeStoreManager.clearResources();
//   });

//   it("works", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useEmployees());

//     await waitForNextUpdate();

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.employees).toEqual(employees);
//   });

//   it("adds an employee", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useEmployees());

//     await waitForNextUpdate();

//     const employee = {
//       name: "test",
//       startDate: "01/01/2021",
//       endDate: "01/01/2022",
//       skills: [{ name: react }],
//     };

//     let id = "";
//     await act(async () => {
//       id = await result.current.addEmployee(employee);
//     });

//     const newEmployee = { ...employee, id };

//     expect(
//       result.current.employees?.find(({ id }) => id === newEmployee.id),
//     ).toEqual(newEmployee);
//   });

//   it("update an employee", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useEmployees());

//     await waitForNextUpdate();

//     const employee = {
//       ...employees[0],
//       name: "FAKE NAME",
//     };

//     await act(() => result.current.updateEmployee(employee.id, employee));

//     expect(
//       result.current.employees?.find(({ id }: any) => id === employee.id),
//     ).toEqual(employee);
//   });

//   it("delete an employee", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useEmployees());

//     await waitForNextUpdate();

//     await act(() => result.current.deleteEmployee(employees[0].id));

//     expect(result.current.employees).not.toContain(employees[0]);
//   });
// });
