import React, { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SectionCard from "../SectionCard/SectionCard";
import styles from "./SectionsSlider.module.css";

const SectionsSlider = ({ sections = [] }) => {
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const container = sliderRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!sliderRef.current) return;
    isDraggingRef.current = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.userSelect = "";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e) => {
    if (e.target.closest("a") || e.target.closest("button")) {
      return;
    }
    const container = sliderRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    const rect = container.getBoundingClientRect();
    startXRef.current = e.clientX - rect.left;
    scrollLeftRef.current = container.scrollLeft;
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
    e.preventDefault();
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <h2 className={styles.heading}>Categories</h2>
          <div className={styles.separator}></div>
          <Link to="/sections" className={styles.navLink}>
            All categories
          </Link>
        </div>
        <div
          className={styles.slider}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.itemsList}>
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionsSlider;
