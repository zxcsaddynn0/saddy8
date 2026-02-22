import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSections } from "../../store/slices/sectionsSlice";
import SectionCard from "../../components/SectionCard/SectionCard";
import styles from "./SectionsListPage.module.css";

const SectionsListPage = () => {
  const dispatch = useDispatch();
  const {
    list: sections,
    loading,
    error,
  } = useSelector((state) => state.sections);

  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    dispatch(loadAllSections());
  }, [dispatch]);

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

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Categories</h1>
        <div
          className={styles.scrollContainer}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.itemsGrid}>
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionsListPage;
