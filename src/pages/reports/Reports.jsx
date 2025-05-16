import { useEffect, useState } from "react";
import { ReportService } from "../../api/reportService";
import { useUser } from "../../hooks/useUser";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Reports.module.css";
import { FaTrashAlt } from "react-icons/fa";

export default function MyReports() {
  const user = useUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // Nuevo estado

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

  const handleDelete = async (report) => {
    setDeletingId(report.id);
    try {
      await ReportService.deleteReport(report.id);
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch {
      alert("Failed to delete report.");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.reportsContainer}>
        <h2>
          {user
            ? `Resultado ${user.name} ${user.surname} Cybersecurity Audits`
            : "My Cybersecurity Audits"}
        </h2>
        {loading && <div>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.reportsGrid}>
          {reports.map((report) => (
            <div
              key={report.id}
              className={styles.reportCard}
              onClick={(e) => {
                if (e.target.closest(`.${styles.trashIcon}`)) return;
                setSelectedReport(report);
              }}
              style={{ cursor: "pointer", position: "relative" }}
              title="View full report"
            >
              <div className={styles.reportHeader}>
                <span className={styles.reportCommand}>{report.command}</span>
                <span className={styles.reportDate}>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : ""}
                </span>
                <span
                  className={styles.trashIcon}
                  title="Delete report"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(report); // Muestra el modal
                  }}
                  style={{ marginLeft: "1rem", cursor: "pointer" }}
                >
                  <FaTrashAlt
                    color="#e53e3e"
                    size={18}
                    style={{
                      opacity: deletingId === report.id ? 0.5 : 1,
                      pointerEvents: deletingId === report.id ? "none" : "auto",
                    }}
                  />
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

      {/* Modal de confirmación bonito */}
      {confirmDelete && (
        <div className={styles.confirmModalOverlay}>
          <div className={styles.confirmModal}>
            <h3>Delete Report</h3>
            <p>
              Are you sure you want to delete this report,
              <span style={{ fontWeight: "bold", color: "#2b6cb0" }}>
                {" "}
                {user?.name} {user?.surname}
              </span>
              ?
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#666",
                marginBottom: "1rem",
              }}
            >
              <strong>Command:</strong> {confirmDelete.command}
            </p>
            <div className={styles.confirmModalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setConfirmDelete(null)}
                disabled={deletingId === confirmDelete.id}
              >
                Cancel
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(confirmDelete)}
                disabled={deletingId === confirmDelete.id}
              >
                {deletingId === confirmDelete.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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
