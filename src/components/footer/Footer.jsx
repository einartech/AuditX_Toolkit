import styles from "./Footer.module.css";
import Copyright from "../copyright/Copyright";
import Symbol from "../symbol/Symbol";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Copyright />
      <Symbol />
    </footer>
  );
}
