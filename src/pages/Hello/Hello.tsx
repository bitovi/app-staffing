export interface HelloProps {
  name: string;
}

export default function Hello({ name }: HelloProps): JSX.Element {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}
