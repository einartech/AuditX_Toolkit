import styles from "./Navbar.module.css";
import NavLink from "../navlink/Navlink";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavLink to="/home" label="Home" />
      <NavLink to="/about" label="About" />
      <NavLink to="/contact" label="Contact" />
    </ul>
  );
}
