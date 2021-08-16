export interface AppProps {
  name: string;
}

export default function App({ name }: AppProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}
