import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
