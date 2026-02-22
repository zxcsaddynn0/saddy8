import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadGoodById, clearSelectedGood } from "../../store/slices/goodsSlice";
import { addToBasket } from "../../store/slices/basketSlice";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import AmountSelector from "../../components/AmountSelector/AmountSelector";
import styles from "./GoodDetailsPage.module.css";

const GoodDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedGood, loading, error } = useSelector((state) => state.goods);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(loadGoodById(id));
    }
    return () => {
      dispatch(clearSelectedGood());
    };
  }, [id, dispatch]);

  const handleAddToBasket = () => {
    if (selectedGood) {
      dispatch(addToBasket({ ...selectedGood, amount }));
      setAmount(1);
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrease = () => {
    setAmount(amount + 1);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !selectedGood) {
    return (
      <div className={styles.error}>Error: {error || "Good not found"}</div>
    );
  }

  const discount = selectedGood.discountPercentage || 0;
  const discountedPrice = selectedGood.discountedPrice || selectedGood.price;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.inner}>
        <div className={styles.details}>
          <div className={styles.photoContainer}>
            {selectedGood.image && (
              <img
                src={selectedGood.image}
                alt={selectedGood.title}
                className={styles.photo}
              />
            )}
          </div>
          <div className={styles.infoBlock}>
            <h1 className={styles.heading}>{selectedGood.title}</h1>
            <div className={styles.priceBlock}>
              <div className={styles.priceSection}>
                <span className={styles.cost}>${discountedPrice}</span>
                {discount > 0 && (
                  <span className={styles.originalPrice}>
                    ${selectedGood.price}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <div className={styles.discountBadgeSmall}>-{discount}%</div>
              )}
            </div>
            <div className={styles.actionsBlock}>
              <AmountSelector
                amount={amount}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
              <PrimaryButton variant="addToBasket" onClick={handleAddToBasket}>
                Add to cart
              </PrimaryButton>
            </div>
            <div className={styles.descriptionBlock}>
              <h2 className={styles.descriptionHeading}>Description</h2>
              <p className={styles.description}>
                {selectedGood.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodDetailsPage;
