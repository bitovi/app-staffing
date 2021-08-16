import { Link } from "react-router-dom";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bob">Bob</Link>
        </li>
      </ul>

      <div>{children}</div>
    </div>
  );
}
