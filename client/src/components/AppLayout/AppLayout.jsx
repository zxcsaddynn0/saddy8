import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
