import styles from "./Sidebar.module.css";

export default function Sidebar({ setActiveContent }) {
  return (
    <div className={styles.sidebar}>
      <button
        className={styles.button}
        data-tooltip="Scan networks with Nmap"
        onClick={() => setActiveContent("nmap")}
      >
        Nmap
      </button>
      <button
        className={styles.button}
        data-tooltip="Find vulnerabilities with Fuzzing"
        onClick={() => setActiveContent("fuzzing")}
      >
        Fuzzing
      </button>
      <button
        className={styles.button}
        data-tooltip="Manage tokens with JWT"
        onClick={() => setActiveContent("jwt")}
      >
        JWT
      </button>
    </div>
  );
}
