import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavigationMenu.module.css";

const NavigationMenu = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/sections") {
      return (
        location.pathname.startsWith("/sections") && location.pathname !== "/"
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navigationMenu}>
      <Link
        to="/"
        className={`${styles.link} ${
          isActive("/") && location.pathname === "/" ? styles.active : ""
        }`}
      >
        Main Page
      </Link>
      <Link
        to="/sections"
        className={`${styles.link} ${
          isActive("/sections") && location.pathname !== "/"
            ? styles.active
            : ""
        }`}
      >
        Categories
      </Link>
      <Link
        to="/goods"
        className={`${styles.link} ${isActive("/goods") ? styles.active : ""}`}
      >
        All products
      </Link>
      <Link
        to="/discounts"
        className={`${styles.link} ${
          isActive("/discounts") ? styles.active : ""
        }`}
      >
        All sales
      </Link>
    </nav>
  );
};

export default NavigationMenu;
