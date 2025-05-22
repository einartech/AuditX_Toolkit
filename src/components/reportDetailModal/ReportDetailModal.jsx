import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./ReportDetailModal.module.css";

// Componente para mostrar el output de forma clara y legible
function OutputBlock({ output }) {
  if (!output) return <div className={styles.noOutput}>No output</div>;

  // Detecta si el output es tabular (2+ espacios o tabulaciones)
  const lines = output.split("\n").filter(Boolean);
  const isTabular =
    lines.length > 1 && lines.some((line) => /\s{2,}|\t/.test(line));

  if (isTabular) {
    // Intenta detectar cabecera
    const rows = lines.map((line) => line.split(/\s{2,}|\t/));
    const hasHeader = rows.length > 1 && rows[0].length === rows[1].length;
    return (
      <div className={styles.outputTableWrapper}>
        <table className={styles.outputTable}>
          <thead>
            {hasHeader && (
              <tr>
                {rows[0].map((col, j) => (
                  <th key={j}>{col}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rows.slice(hasHeader ? 1 : 0).map((cols, i) => (
              <tr key={i}>
                {cols.map((col, j) => (
                  <td key={j}>{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Si no es tabular, muestra como bloque de texto preformateado y legible
  return <pre className={styles.outputPre}>{output}</pre>;
}

export default function ReportDetailModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className={styles.reportModalOverlay}>
      <div className={styles.reportModal}>
        <button className={styles.closeButton} onClick={onClose} title="Close">
          ×
        </button>
        <Header />
        <div className={styles.reportModalContent}>
          <h2>Report Detail</h2>
          {/* Comando */}
          <section className={styles.reportSection}>
            <h3>Command</h3>
            <div className={styles.reportCommand}>
              <code className={styles.commandCode}>{report.command}</code>
            </div>
          </section>
          {/* Output */}
          <section className={styles.reportSection}>
            <h3>Output</h3>
            <OutputBlock output={report.output} />
          </section>
          {/* Exit code */}
          <section className={styles.reportSection}>
            <h3>Exit Code</h3>
            <div className={styles.reportExitCode}>{report.exitCode}</div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}
