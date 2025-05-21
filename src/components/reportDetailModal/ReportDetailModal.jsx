import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./ReportDetailModal.module.css";

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
          <div className={styles.reportHeader}>
            <span className={styles.reportCommand}>{report.command}</span>
            <span className={styles.reportDate}>
              {report.createdAt
                ? new Date(report.createdAt).toLocaleString()
                : ""}
            </span>
          </div>
          <div className={styles.reportOutput} style={{ maxHeight: "60vh" }}>
            <pre>{report.output}</pre>
          </div>
          <div className={styles.reportFooter}>
            <span>Exit code: {report.exitCode}</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
