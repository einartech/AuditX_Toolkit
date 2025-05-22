import styles from "./Logo.module.css";
import logoImage from "../../assets/images/logo/2.png";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoImage} alt="Logo" className={styles.logoImage} />
    </div>
  );
}
