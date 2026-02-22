import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBasketItemsCount } from "../../store/slices/basketSlice";
import styles from "./BasketIcon.module.css";
import basket from "../../assets/images/basket.png";

const BasketIcon = () => {
  const itemsCount = useSelector(getBasketItemsCount);
  const hasItems = itemsCount > 0;

  return (
    <Link to="/basket" className={styles.basketIcon}>
      <img src={basket} alt="Basket" />
      {hasItems && (
        <span className={styles.badge}>
          {itemsCount > 99 ? "99+" : itemsCount}
        </span>
      )}
    </Link>
  );
};

export default BasketIcon;
