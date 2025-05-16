import styles from "./Navbar.module.css";
import NavLink from "../navlink/Navlink";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const isAuthenticated = useAuth();

  return (
    <ul className={styles.navbar}>
      <NavLink to="/about" label="About" />
      {isAuthenticated && (
        <>
          <NavLink to="/audit-x-toolkit" label="Audit X Toolkit" />
          <NavLink to="/home" label="Home" />
          {/* Puedes añadir más enlaces aquí */}
        </>
      )}
    </ul>
  );
}
