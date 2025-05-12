import { Link } from "react-router-dom";

export default function NavLink({ to, label }) {
  return (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}
