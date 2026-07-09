"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactModule = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Ошибка:", err);
      setStatus("error");
    }
  };

  return (
    <div className={styles.contact}>
      <div className="global-container">
        <div className={styles.contactsSection}>
          <h1>{t("contact.title")}</h1>
          <div className={styles.contactsCard}>
            <div className={styles.infoSide}>
              <div className={styles.infoHead}>
                <h3>{t("contact.infoTitle")}</h3>
                <p>{t("contact.infoSubtitle")}</p>
              </div>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.icon}>
                    <Image src={'./contact/phone.svg'} alt="Phone" width={24} height={24} />
                  </span>
                  <a href="tel:+998712357804">+998 71 235-78-04</a>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.icon}>
                    <Image src={'./contact/mail.svg'} alt="Email" width={24} height={24} />
                  </span>
                  <a href="mailto:info@auditreyting.uz">info@auditreyting.uz</a>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.icon}>
                    <Image src={'./contact/location.svg'} alt="Location" width={40} height={40} />
                  </span>
                  <p className={styles.infoText}>{t("contact.addressText")}</p>
                </div>
              </div>

              <div className={styles.socials}>
                <a href="#" aria-label="Twitter" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <Image src={'./contact/twitter.svg'} alt="Twitter" width={24} height={24} />
                  </span>
                </a>
                <a href="#" aria-label="Instagram" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <Image src={'./contact/instagram.svg'} alt="Instagram" width={24} height={24} />
                  </span>
                </a>
                <a href="#" aria-label="Discord" className={styles.socialLink}>
                  <span className={styles.socialIcon}>
                    <Image src={'./contact/discord.svg'} alt="Discord" width={24} height={24} />
                  </span>
                </a>
              </div>

              <div className={styles.decorCircles}>
                <div className={styles.circleDarkGreen}></div>
                <div className={styles.circleDarkBlue}></div>
              </div>
            </div>

            <form className={styles.formSide} onSubmit={handleSubmit}>
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName">{t("contact.firstName")}</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">{t("contact.lastName")}</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">{t("contact.email")}</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">{t("contact.phone")}</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.messageGroup}>
                <h4>{t("contact.writeToUs")}</h4>
                <div className={styles.inputGroup}>
                  <label htmlFor="message">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    placeholder={t("contact.messagePlaceholder")}
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
                  {status === "sending" ? t("contact.sending") : t("contact.send")}
                </button>
              </div>

              {status === "success" && (
                <p className={styles.formSuccess}>{t("contact.success")}</p>
              )}
              {status === "error" && (
                <p className={styles.formError}>{t("contact.error")}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModule;