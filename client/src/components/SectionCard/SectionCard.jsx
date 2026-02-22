import React from "react";
import { Link } from "react-router-dom";
import styles from "./SectionCard.module.css";

const SectionCard = ({ section }) => {
  return (
    <Link to={`/sections/${section.id}`} className={styles.sectionCard}>
      <div className={styles.photoWrapper}>
        {section.image && (
          <img
            src={section.image}
            alt={section.title}
            className={styles.photo}
          />
        )}
      </div>
      <h3 className={styles.heading}>{section.title}</h3>
    </Link>
  );
};

export default SectionCard;
