import styles from "./DeleteConfirmModal.module.css";

export default function DeleteConfirmModal({
  user,
  report,
  deletingId,
  onCancel,
  onDelete,
}) {
  if (!report) return null;
  return (
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
          <strong>Command:</strong> {report.command}
        </p>
        <div className={styles.confirmModalButtons}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={deletingId === report.id}
          >
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            onClick={onDelete}
            disabled={deletingId === report.id}
          >
            {deletingId === report.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
