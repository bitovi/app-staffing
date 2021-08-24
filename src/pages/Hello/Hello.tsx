import type { Employee } from "../../services/api";

export default function Hello({ name }: { name: string }): JSX.Element {
  const { data: employees } = useEmployees();

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
