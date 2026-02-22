import React, { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import GoodCard from "../GoodCard/GoodCard";
import styles from "./DiscountsSlider.module.css";

const DiscountsSlider = ({ goods = [] }) => {
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

  if (goods.length === 0) {
    return null;
  }

  return (
    <section className={styles.block}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>Sale</h2>
          <div className={styles.separator}></div>
          <Link to="/discounts" className={styles.linkBtn}>
            All sales
          </Link>
        </div>
        <div
          className={styles.scrollContainer}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.grid}>
            {goods.map((good) => (
              <GoodCard key={good.id} good={good} hideAddToBasket={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountsSlider;
