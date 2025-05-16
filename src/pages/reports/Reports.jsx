import { useEffect, useState } from "react";
import { ReportService } from "../../api/reportService";
import { useUser } from "../../hooks/useUser";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Reports.module.css";

export default function MyReports() {
  const user = useUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      setError("You must be logged in to view your reports.");
      return;
    }
    const fetchReports = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await ReportService.getReportsByUser(user.id);
        setReports(data);
      } catch {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.reportsContainer}>
        <h2>
          {user
            ? `${user.name} ${user.surname} Cybersecurity Reports`
            : "My Cybersecurity Audits"}
        </h2>
        {loading && <div>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.reportsGrid}>
          {reports.map((report) => (
            <div
              key={report.id}
              className={styles.reportCard}
              onClick={() => setSelectedReport(report)}
              style={{ cursor: "pointer" }}
              title="View full report"
            >
              <div className={styles.reportHeader}>
                <span className={styles.reportCommand}>{report.command}</span>
                <span className={styles.reportDate}>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
              <div className={styles.reportOutput}>
                <pre>{report.output}</pre>
              </div>
              <div className={styles.reportFooter}>
                <span>Exit code: {report.exitCode}</span>
              </div>
            </div>
          ))}
        </div>
        {!loading && reports.length === 0 && <div>No reports found.</div>}
      </div>

      {/* Modal de detalle */}
      {selectedReport && (
        <div className={styles.reportModalOverlay}>
          <div className={styles.reportModal}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedReport(null)}
              title="Close"
            >
              ×
            </button>
            <Header />
            <div className={styles.reportModalContent}>
              <h2>Report Detail</h2>
              <div className={styles.reportHeader}>
                <span className={styles.reportCommand}>
                  {selectedReport.command}
                </span>
                <span className={styles.reportDate}>
                  {selectedReport.createdAt
                    ? new Date(selectedReport.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
              <div
                className={styles.reportOutput}
                style={{ maxHeight: "60vh" }}
              >
                <pre>{selectedReport.output}</pre>
              </div>
              <div className={styles.reportFooter}>
                <span>Exit code: {selectedReport.exitCode}</span>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
