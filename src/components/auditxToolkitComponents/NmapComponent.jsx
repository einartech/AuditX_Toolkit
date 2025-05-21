import { useState } from "react";
import { NmapService } from "../../api/nmapService";
import { useUser } from "../../hooks/useUser";
import styles from "./NmapComponent.module.css";
import Button from "../../components/button/Button"; // Ajusta la ruta si es necesario

export default function NmapComponent() {
  const [target, setTarget] = useState("");
  const [flags, setFlags] = useState("");
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
    if (!user?.id || !result || saving) return; // <-- evita múltiples envíos
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

      {result && (
        <div className={styles.buttonRow} style={{ marginTop: "2rem" }}>
          <Button
            className={styles.discardButton}
            onClick={() => {
              setResult(null);
              setSaveMsg("");
              setError("");
            }}
            disabled={saving}
            type="button"
            label="Descartar Reporte"
          />
          <Button
            className={styles.saveButton}
            onClick={handleSaveReport}
            disabled={saving}
            type="button"
            label={saving ? "Saving..." : "Guardar Reporte Nmap"}
          />
        </div>
      )}
    </div>
  );
}
