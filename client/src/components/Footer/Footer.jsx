import React from "react";
import styles from "./Footer.module.css";
import instagramIcon from "../../assets/images/instagram.png";
import whatsappIcon from "../../assets/images/whatsapp.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.cards}>
              <div className={styles.card}>
                <p className={styles.label}>Phone</p>
                <p className={styles.value}>+7 (499) 350-66-04</p>
              </div>
              <div className={styles.card}>
                <p className={styles.label}>Socials</p>
                <div className={styles.socials}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a
                    href="https://wa.me/74993506604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <img src={whatsappIcon} alt="WhatsApp" />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <p className={styles.label}>Address</p>
                <p className={styles.value}>
                  Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.label}>Working Hours</p>
                <p className={styles.value}>24 hours a day</p>
              </div>
            </div>
          </div>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5!2d37.618!3d55.7512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzA0LjMiTiAzN8KwMzcnMDQuOCJF!5e0!3m2!1sen!2sru!4v1234567890123!5m2!1sen!2sru"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
            <div className={styles.mapAddressBadge}>
              <p className={styles.mapAddressText}>
                Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
              </p>
            </div>
            <div className={styles.mapControls}>
              <button className={styles.mapControlButton} type="button">
                +
              </button>
              <button className={styles.mapControlButton} type="button">
                −
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
