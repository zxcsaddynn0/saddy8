import React, { useState } from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({
  children,
  onClick,
  variant = "normal",
  type = "button",
  disabled = false,
  isInBasket = false,
  isActive: externalIsActive = false,
}) => {
  const [internalIsActive, setInternalIsActive] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      if (variant === "addToBasket" && !isInBasket) {
        setInternalIsActive(true);
        setTimeout(() => setInternalIsActive(false), 2000);
      }
    }
  };

  const showAdded =
    (isInBasket || internalIsActive) && variant === "addToBasket";
  const isActiveState = externalIsActive || (variant === "hero" && disabled);

  return (
    <button
      type={type}
      className={`${styles.primaryBtn} ${styles[variant]} ${
        showAdded || isActiveState ? styles.active : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {showAdded ? "Added" : children}
    </button>
  );
};

export default PrimaryButton;
