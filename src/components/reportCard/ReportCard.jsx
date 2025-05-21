import { FaTrashAlt } from "react-icons/fa";
import styles from "./ReportCard.module.css";

export default function ReportCard({ report, onSelect, onDelete, deletingId }) {
  return (
    <div
      className={styles.reportCard}
      onClick={onSelect}
      style={{ cursor: "pointer", position: "relative" }}
      title="View full report"
    >
      <div className={styles.reportHeader}>
        <span className={styles.reportCommand}>{report.command}</span>
        <span className={styles.reportDate}>
          {report.createdAt ? new Date(report.createdAt).toLocaleString() : ""}
        </span>
        <span
          className={styles.trashIcon}
          title="Delete report"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
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
  );
}
