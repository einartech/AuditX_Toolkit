import styles from "./Header.module.css";
import Logo from "../logo/Logo";
import Button from "../button/Button";
import Navbar from "../navbar/Navbar";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
      <div className={styles.buttons}>
        <Button label="Log In" />
      </div>
    </header>
  );
}
