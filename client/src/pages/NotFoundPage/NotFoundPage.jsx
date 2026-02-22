import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import cactusImage from "../../assets/images/cactus-404.png";

const NotFoundPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.inner}>
        <div className={styles.contentBlock}>
          <img src={cactusImage} alt="404 Cactus" className={styles.photo} />
          <h1 className={styles.heading}>Page Not Found</h1>
          <p className={styles.message}>
            We're sorry, the page you requested could not be found.
            <br />
            Please go back to the homepage.
          </p>
          <Link to="/" className={styles.homeLink}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
