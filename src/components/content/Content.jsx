import PropTypes from "prop-types";
import styles from "./Content.module.css";

export default function Content({ title, children }) {
  return (
    <div className={styles.content}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

Content.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
