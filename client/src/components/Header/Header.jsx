import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import BasketIcon from "../BasketIcon/BasketIcon";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <div className={styles.navigationWrapper}>
          <NavigationMenu />
        </div>
        <div className={styles.basketWrapper}>
          <BasketIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
