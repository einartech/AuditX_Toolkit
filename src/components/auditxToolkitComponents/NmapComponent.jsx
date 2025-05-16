import { useState } from "react";
import { NmapService } from "../../api/nmapService";
import { useUser } from "../../hooks/useUser";
import styles from "./NmapComponent.module.css";

export default function NmapComponent() {
  const [target, setTarget] = useState("scanme.nmap.org");
  const [flags, setFlags] = useState("-A");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setSaveMsg("");
    try {
      const data = await NmapService.runScan({ target, flags });
      setResult(data);
    } catch (err) {
      setError(err.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!user?.id || !result) return;
    setSaving(true);
    setSaveMsg("");
    try {
      await NmapService.saveReport(user.id, {
        command: `nmap ${flags} ${target}`,
        output:
          typeof result === "string" ? result : JSON.stringify(result, null, 2),
        exitCode: 0, // Ajusta si tienes el exitCode real
      });
      setSaveMsg("Report saved successfully!");
    } catch (err) {
      setSaveMsg("Failed to save report.");
    } finally {
      setSaving(false);
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
          <pre className={styles.resultPre}>
            {typeof result === "string"
              ? result
              : JSON.stringify(result, null, 2)}
          </pre>
          <div className={styles.buttonRow}>
            <button
              className={styles.discardButton}
              onClick={() => {
                setResult(null);
                setSaveMsg("");
                setError("");
              }}
              disabled={saving}
              type="button"
            >
              Descartar Reporte
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSaveReport}
              disabled={saving}
              type="button"
            >
              {saving ? "Saving..." : "Guardar Reporte Nmap"}
            </button>
          </div>
          {saveMsg && (
            <div
              className={
                saveMsg.includes("success")
                  ? styles.saveMsgSuccess
                  : styles.saveMsgError
              }
            >
              {saveMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
