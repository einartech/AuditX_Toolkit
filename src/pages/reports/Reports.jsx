import { useEffect, useState } from "react";
import { ReportService } from "../../api/reportService";
import { useUser } from "../../hooks/useUser";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Reports.module.css";
import ReportCard from "../../components/reportCard/ReportCard";
import ReportDetailModal from "../../components/reportDetailModal/ReportDetailModal";
import DeleteConfirmModal from "../../components/deleteConfirmModal/DeleteConfirmModal";

export default function MyReports() {
  const user = useUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

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
            <ReportCard
              key={report.id}
              report={report}
              deletingId={deletingId}
              onSelect={() => setSelectedReport(report)}
              onDelete={() => setConfirmDelete(report)}
            />
          ))}
        </div>
        {!loading && reports.length === 0 && <div>No reports found.</div>}
      </div>

      <DeleteConfirmModal
        user={user}
        report={confirmDelete}
        deletingId={deletingId}
        onCancel={() => setConfirmDelete(null)}
        onDelete={() => handleDelete(confirmDelete)}
      />

      <ReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      <Footer />
    </>
  );
}
