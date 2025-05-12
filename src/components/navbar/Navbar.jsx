import styles from "./Navbar.module.css";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <NavLink to="/home" label="Home" />
      <NavLink to="/about" label="About" />
      <NavLink to="/contact" label="Contact" />
    </ul>
  );
}
