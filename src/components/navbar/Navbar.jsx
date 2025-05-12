import styles from "./Navbar.module.css";
import NavLink from "../navlink/Navlink";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavLink to="/audit-x-toolkit" label="Audit X Toolkit" />
      <NavLink to="/about" label="About" />
      <NavLink to="/home" label="Home" />
    </ul>
  );
}
