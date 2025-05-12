import styles from "./Logo.module.css";
import logoImage from "../../assets/images/react.svg"; // Importa la imagen del logo

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoImage} alt="Logo" className={styles.logoImage} />
    </div>
  );
}
