import styles from "./Main.module.css";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";

export default function Main() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <Content title="Dynamic Content">
        <p>This is a dynamic content area. You can add any content here.</p>
      </Content>
      <Content>
        <p>This content does not have a title.</p>
      </Content>
    </main>
  );
}
