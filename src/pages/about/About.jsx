import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./About.module.css";

export default function About() {
  return (
    <>
      <Header />
      <main className={styles.aboutMain}>
        <h1>About AuditX Toolkit</h1>
        <p>
          <strong>AuditX Toolkit</strong> is a modern web application for
          cybersecurity professionals, penetration testers, and IT
          administrators. It streamlines security auditing by integrating
          essential tools into a single, intuitive platform.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>
            Run security tools such as <strong>Nmap</strong>,{" "}
            <strong>Fuzzing</strong>, and <strong>JWT analysis</strong> directly
            from your browser.
          </li>
          <li>Securely save, review, and manage your scan reports.</li>
          <li>
            Responsive, professional interface for desktop, tablet, and mobile.
          </li>
        </ul>
        <h2>Intended Users</h2>
        <ul>
          <li>Cybersecurity professionals & ethical hackers</li>
          <li>Penetration testers</li>
          <li>IT administrators & network engineers</li>
        </ul>
        <h2>Quick Start: Nmap Tool</h2>
        <ol>
          <li>
            Open the <strong>Nmap</strong> section from the sidebar.
          </li>
          <li>
            Enter a <strong>Target</strong> (e.g., <code>scanme.nmap.org</code>
            ).
          </li>
          <li>
            Specify <strong>Flags</strong> (e.g., <code>-A</code> for an
            aggressive scan).
          </li>
          <li>
            Click <strong>Run Nmap Scan</strong> and review the results.
          </li>
          <li>Optionally, save the report for future reference.</li>
        </ol>
        <pre>
          Target: scanme.nmap.org Flags: -A Command: nmap -A scanme.nmap.org
        </pre>
        <p>
          <strong>Note:</strong> Always obtain proper authorization before
          scanning any system or network. Unauthorized scanning is illegal and
          unethical.
        </p>
      </main>
      <Footer />
    </>
  );
}
