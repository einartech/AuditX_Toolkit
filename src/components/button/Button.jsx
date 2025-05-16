import styles from "./Button.module.css";

export default function Button({ label, onClick, ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {label}
    </button>
  );
}
