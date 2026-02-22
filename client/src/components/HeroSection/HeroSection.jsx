import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import heroImage from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Amazing Discounts on&nbsp;Garden Products!
        </h1>
        <Link to="/discounts" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
