import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <button className={styles.button}>Nmap</button>
      <button className={styles.button}>Fuzzing</button>
      <button className={styles.button}>JWT</button>
    </div>
  );
}
