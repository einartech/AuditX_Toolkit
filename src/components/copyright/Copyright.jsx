import styles from "./Copyright.module.css";

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      © {new Date().getFullYear()} AuditX Toolkit. All rights reserved to
      Einartech. Powered by Alex, Yeral & Lola from Factoria F5.
    </div>
  );
}
