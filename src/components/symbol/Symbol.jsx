import styles from "./Symbol.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Symbol() {
  return (
    <div className={styles.symbols}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
    </div>
  );
}
