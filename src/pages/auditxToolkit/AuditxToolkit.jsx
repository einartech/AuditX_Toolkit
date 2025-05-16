import { useState } from "react";
import styles from "./AuditxToolkit.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import NmapComponent from "../../components/auditxToolkitComponents/NmapComponent";
import FuzzingComponent from "../../components/auditxToolkitComponents/FuzzingComponent";
import JwtComponent from "../../components/auditxToolkitComponents/JwtComponent";

export default function AuditxToolkit() {
  const [activeContent, setActiveContent] = useState("nmap");

  const renderContent = () => {
    switch (activeContent) {
      case "nmap":
        return (
          <Content title="Nmap">
            <NmapComponent />
          </Content>
        );
      case "fuzzing":
        return (
          <Content title="Fuzzing">
            <FuzzingComponent />
          </Content>
        );
      case "jwt":
        return (
          <Content title="JWT">
            <JwtComponent />
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
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar setActiveContent={setActiveContent} />
        {renderContent()}
      </main>
      <Footer />
    </>
  );
}
