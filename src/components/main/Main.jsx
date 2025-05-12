import { useState } from "react";
import styles from "./Main.module.css";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";

export default function Main() {
  const [activeContent, setActiveContent] = useState("nmap");

  const renderContent = () => {
    switch (activeContent) {
      case "nmap":
        return (
          <Content title="Nmap">
            <p>
              Nmap is a powerful network scanning tool. Add your content here.
            </p>
          </Content>
        );
      case "fuzzing":
        return (
          <Content title="Fuzzing">
            <p>
              Fuzzing is a technique for finding vulnerabilities in software.
            </p>
          </Content>
        );
      case "jwt":
        return (
          <Content title="JWT">
            <p>
              JWT (JSON Web Token) is a compact, URL-safe means of representing
              claims.
            </p>
          </Content>
        );
      default:
        return (
          <Content title="Default Content">
            <p>
              This is the default content area. Click a button to change the
              content.
            </p>
          </Content>
        );
    }
  };

  return (
    <main className={styles.main}>
      <Sidebar setActiveContent={setActiveContent} />
      {renderContent()}
    </main>
  );
}
