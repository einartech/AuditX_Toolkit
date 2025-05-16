import { useState } from "react";
import { NmapService } from "../../api/nmapService";
import styles from "./NmapComponent.module.css";

export default function NmapComponent() {
  const [target, setTarget] = useState("scanme.nmap.org");
  const [flags, setFlags] = useState("-sV -p 80");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await NmapService.runScan({ target, flags });
      setResult(data);
    } catch (err) {
      setError(err.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.nmapContainer}>
      <h2>Nmap</h2>
      <form className={styles.nmapForm} onSubmit={handleSubmit}>
        <div>
          <label>
            Target:
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Flags:
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Scanning..." : "Run Nmap Scan"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && (
        <div className={styles.resultContainer}>
          <h3>Scan Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
