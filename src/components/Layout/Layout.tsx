import { Link } from "react-router-dom";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
      </ul>

      <div>{children}</div>
    </div>
  );
}
