import styles from "./Footer.module.css";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";

export default function Footer() {
  return (
    <footer>
      <h1 className={styles.greenTitle}>SOY EL COMPONENTE FOOTER</h1>
      <Logo />
      <Navbar />
    </footer>
  );
}
