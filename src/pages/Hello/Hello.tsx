import { useEmployees } from "../Employees/useEmployees";

export default function Hello({ name }: { name: string }): JSX.Element {
  const { employees } = useEmployees()

  return (
    <div>
      <h1>Hello, {name}!</h1>
      {employees && (
        <ul>
          {employees.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
