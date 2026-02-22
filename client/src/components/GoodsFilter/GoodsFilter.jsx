import React, { useState, useEffect, useRef } from "react";
import styles from "./GoodsFilter.module.css";

const GoodsFilter = ({
  priceFrom,
  priceTo,
  onPriceFromChange,
  onPriceToChange,
  discountedOnly,
  onDiscountedChange,
  sortBy,
  onSortChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen]);

  const sortOptions = [
    { value: "default", label: "by default" },
    { value: "newest", label: "newest" },
    { value: "price-high-low", label: "price: high-low" },
    { value: "price-low-high", label: "price: low-high" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "by default";

  return (
    <div className={styles.goodsFilter}>
      <div className={styles.filterSection}>
        <label className={styles.label}>Price</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="from"
            value={priceFrom || ""}
            onChange={(e) => onPriceFromChange(e.target.value)}
            className={styles.priceInput}
          />
          <input
            type="number"
            placeholder="to"
            value={priceTo || ""}
            onChange={(e) => onPriceToChange(e.target.value)}
            className={styles.priceInput}
          />
        </div>
      </div>

      {onDiscountedChange && (
        <div className={styles.filterSection}>
          <label className={styles.label}>Discounted items</label>
          <label className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              checked={discountedOnly}
              onChange={(e) => onDiscountedChange(e.target.checked)}
              className={styles.checkbox}
              disabled={discountedOnly && !onDiscountedChange}
            />
            <span
              className={`${styles.checkmark} ${
                discountedOnly ? styles.checked : ""
              }`}
            >
              {discountedOnly && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="white"
                  />
                </svg>
              )}
            </span>
          </label>
        </div>
      )}

      <div className={styles.filterSection}>
        <label className={styles.label}>Sorted</label>
        <div className={styles.sortWrapper} ref={sortRef}>
          <button
            className={styles.sortButton}
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <span>{currentSortLabel}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`${styles.sortIcon} ${isSortOpen ? styles.open : ""}`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isSortOpen && (
            <div className={styles.sortDropdown}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortOption} ${
                    sortBy === option.value ? styles.active : ""
                  }`}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsFilter;
