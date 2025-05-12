import styles from "./Copyright.module.css";

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      © {new Date().getFullYear()} AuditX Toolkit. All rights reserved.
    </div>
  );
}
