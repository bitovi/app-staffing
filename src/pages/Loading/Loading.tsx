export default function Loading(): JSX.Element {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };
  return <div style={divStyle}>Loading...</div>;
}
