import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./DiscountForm.module.css";

const DiscountForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/sale/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === "OK") {
          setIsSubmitted(true);
          reset();
          setTimeout(() => setIsSubmitted(false), 3000);
        } else {
          console.error("Error: Server returned non-OK status");
        }
      } else {
        console.error("Error: Request failed with status", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className={styles.block}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>5% off on the first order</h2>
        <div className={styles.details}>
          <div className={styles.photoContainer}>
            <div className={styles.photo}></div>
          </div>
          <form className={styles.formBlock} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fields}>
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
            <PrimaryButton
              variant="hero"
              type="submit"
              disabled={isSubmitted}
              isActive={isSubmitted}
            >
              {isSubmitted ? "Request Submitted" : "Get a discount"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiscountForm;
