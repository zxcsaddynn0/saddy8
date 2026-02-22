import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  removeFromBasket,
  changeQuantity,
  emptyBasket,
} from "../../store/slices/basketSlice";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import AmountSelector from "../../components/AmountSelector/AmountSelector";
import styles from "./BasketPage.module.css";

const BasketPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.basket);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRemove = (goodId) => {
    dispatch(removeFromBasket(goodId));
  };

  const handleAmountChange = (goodId, newAmount) => {
    if (newAmount <= 0) {
      handleRemove(goodId);
    } else {
      dispatch(changeQuantity({ id: goodId, amount: newAmount }));
    }
  };

  const totalPrice = list.reduce((sum, item) => {
    const price = item.discountedPrice || item.price;
    return sum + price * item.amount;
  }, 0);

  const totalItems = list.reduce((sum, item) => sum + item.amount, 0);

  const handleOrder = async (formData) => {
    const orderData = {
      ...formData,
      items: list.map((item) => ({
        id: item.id,
        quantity: item.amount,
      })),
      total: totalPrice,
    };

    try {
      const response = await fetch("/order/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setIsOrderPlaced(true);
        reset();
        setTimeout(() => {
          dispatch(emptyBasket());
          setIsOrderPlaced(false);
          navigate("/");
        }, 3000);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsOrderPlaced(false);
    dispatch(emptyBasket());
    navigate("/");
  };

  if (list.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.inner}>
          <div className={styles.topSection}>
            <h1 className={styles.heading}>Shopping cart</h1>
            <div className={styles.rightSection}>
              <div className={styles.separator}></div>
              <Link to="/" className={styles.backLink}>
                Back to the store
              </Link>
            </div>
          </div>
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Looks like you have no items in your basket currently.
            </p>
            <Link to="/" className={styles.emptyLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {isOrderPlaced && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={styles.successBlock}>
              <div className={styles.successIcon}>✓</div>
              <h1 className={styles.successHeading}>Congratulations!</h1>
              <p className={styles.successText}>
                Your order has been successfully placed!
              </p>
              <p className={styles.successText}>
                Thank you for your order. You will be redirected to the main
                page shortly.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <h1 className={styles.heading}>Shopping cart</h1>
          <div className={styles.rightSection}>
            <div className={styles.separator}></div>
            <Link to="/" className={styles.backLink}>
              Back to the store
            </Link>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.itemsList}>
            {list.map((item) => {
              const discount = item.discountPercentage || 0;
              const price = item.discountedPrice || item.price;
              const itemTotal = price * item.amount;

              return (
                <div key={item.id} className={styles.basketItem}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.itemPhoto}
                    />
                  )}
                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <h3 className={styles.itemHeading}>{item.title}</h3>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleRemove(item.id)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className={styles.itemBottom}>
                      <AmountSelector
                        amount={item.amount}
                        onDecrease={() =>
                          handleAmountChange(item.id, item.amount - 1)
                        }
                        onIncrease={() =>
                          handleAmountChange(item.id, item.amount + 1)
                        }
                      />
                      <div className={styles.costBlock}>
                        <span className={styles.cost}>${itemTotal}</span>
                        {discount > 0 && (
                          <span className={styles.originalCost}>
                            ${item.price * item.amount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            className={styles.orderFormBlock}
            onSubmit={handleSubmit(handleOrder)}
          >
            <div className={styles.formHeader}>
              <h2 className={styles.formHeading}>Order details</h2>
              <div className={styles.formInfo}>
                <p className={styles.itemsCountText}>
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
                <div className={styles.totalBlock}>
                  <span className={styles.totalLabelText}>Total</span>
                  <span className={styles.totalCost}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.formFields}>
              <input
                type="text"
                placeholder="Name"
                className={styles.field}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className={styles.errorMsg}>{errors.name.message}</span>
              )}
              <input
                type="tel"
                placeholder="Phone number"
                className={styles.field}
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && (
                <span className={styles.errorMsg}>{errors.phone.message}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                className={styles.field}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className={styles.errorMsg}>{errors.email.message}</span>
              )}
            </div>
            <PrimaryButton variant="addToBasket" type="submit">
              Order
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
