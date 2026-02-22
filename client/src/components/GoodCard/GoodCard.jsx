import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToBasket } from "../../store/slices/basketSlice";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./GoodCard.module.css";

const GoodCard = ({ good, hideAddToBasket = false }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.basket.list);
  const isInBasket = basketItems.some((item) => item.id === good.id);

  const handleAddToBasket = () => {
    dispatch(addToBasket({ ...good, amount: 1 }));
  };

  const discount = good.discountPercentage || 0;
  const discountedPrice = good.discountedPrice || good.price;

  return (
    <div className={styles.goodCard}>
      <Link to={`/goods/${good.id}`} className={styles.imageWrapper}>
        {good.image && (
          <img src={good.image} alt={good.title} className={styles.img} />
        )}
        {discount > 0 && (
          <div className={styles.discountBadge}>-{discount}%</div>
        )}
        {!hideAddToBasket && (
          <div className={styles.buttonWrapper}>
            <PrimaryButton
              variant="addToBasket"
              onClick={handleAddToBasket}
              isInBasket={isInBasket}
            >
              Add to cart
            </PrimaryButton>
          </div>
        )}
      </Link>
      <div className={styles.info}>
        <Link to={`/goods/${good.id}`}>
          <h3 className={styles.heading}>{good.title}</h3>
        </Link>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${discountedPrice}</span>
          {discount > 0 && (
            <span className={styles.oldPrice}>${good.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodCard;
