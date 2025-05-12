import styles from "./Button.module.css";

export default function Button({ label = "Click Me" }) {
  return <button className={styles.button}>{label}</button>;
}
