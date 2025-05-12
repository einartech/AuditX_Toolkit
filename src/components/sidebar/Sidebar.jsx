import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ setActiveContent }) {
  const [ip, setIp] = useState("");
  const os = window.navigator.platform; // Obtiene el sistema operativo

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

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
      <div className={styles.info}>
        <p>Your Public IP: {ip || "Loading..."}</p>
        <p>Your OS: {os}</p>
      </div>
    </div>
  );
}
