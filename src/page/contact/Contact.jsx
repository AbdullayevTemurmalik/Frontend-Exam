import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const BOT_TOKEN = "8443183876:AAFbzKHVIYZx5512mK7Q3jSwbIAQcOkathM";
  const CHAT_ID = "5387795208";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = `📌 New Message:\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n📝 Message: ${formData.message}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
        },
      );

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            const progressBar = toast.querySelector(
              ".swal2-timer-progress-bar",
            );
            progressBar.style.backgroundColor = "#2ecc71";
            let timerInterval = setInterval(() => {
              if (Swal.getTimerLeft() < 1000) {
                progressBar.style.backgroundColor = "#db4444";
                clearInterval(timerInterval);
              }
            }, 100);
          },
        });

        Toast.fire({
          icon: "success",
          title: t("success_sent"),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container contact-wrap">
      <title>{t("contact_title")}</title>

      <div className="contact-left">
        <div className="contact">
          <div className="contact-title">
            <span>
              <IoCall />
            </span>{" "}
            {t("call_to_us")}
          </div>
          <h3>{t("available_text")}</h3>
          <h3>Phone: +8801611112222</h3>
        </div>
        <div className="contact">
          <hr />
          <div className="contact-title">
            <span>
              <FaEnvelope />
            </span>{" "}
            {t("write_to_us")}
          </div>
          <h3>{t("fill_form_text")}</h3>
          <h3>Email: customer@exclusive.com</h3>
        </div>
      </div>

      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <div className="inp-top">
            <input
              type="text"
              name="name"
              placeholder={t("your_name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("your_email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="phone"
              placeholder={t("your_phone")}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder={t("your_message")}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="send-btn">
            {t("send_message")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
