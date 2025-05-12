import styles from "./Navbar.module.css";
import NavLink from "../navlink/Navlink";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavLink to="/auditxtoolkit" label="AuditX Toolkit" />
      <NavLink to="/about-the-project" label="About the project" />
    </ul>
  );
}
