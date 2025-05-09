import styles from "./Header.module.css";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
import Button from "../button/Button";

export default function Header() {
  return (
    <header>
      <h1 className={styles.greenTitle}>SOY EL COMPONENTE HEADER</h1>
      <Logo />
      <Navbar />
      <Button />
    </header>
  );
}
