import React from "react";
import styles from "./AmountSelector.module.css";
import minusIcon from "../../assets/images/minus.png";
import plusIcon from "../../assets/images/plus.png";

const AmountSelector = ({ amount, onDecrease, onIncrease }) => {
  return (
    <div className={styles.amountSelector}>
      <button
        className={styles.button}
        onClick={onDecrease}
        disabled={amount <= 1}
      >
        <img src={minusIcon} alt="Decrease" className={styles.icon} />
      </button>
      <span className={styles.amount}>{amount}</span>
      <button className={styles.button} onClick={onIncrease}>
        <img src={plusIcon} alt="Increase" className={styles.icon} />
      </button>
    </div>
  );
};

export default AmountSelector;
