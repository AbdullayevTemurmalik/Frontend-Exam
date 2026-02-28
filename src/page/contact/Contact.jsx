import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Contact.css";

const Contact = () => {
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
          title: "Successfully sent!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container contact-wrap">
      <div className="contact-left">
        <div className="contact">
          <div className="contact-title">
            <span>
              <IoCall />
            </span>{" "}
            Call To Us
          </div>
          <h3>We are available 24/7, 7 days a week.</h3>
          <h3>Phone: +8801611112222</h3>
        </div>
        <div className="contact">
          <hr />
          <div className="contact-title">
            <span>
              <FaEnvelope />
            </span>{" "}
            Write To US
          </div>
          <h3>Fill out our form and we will contact you within 24 hours.</h3>
          <h3>Email: customer@exclusive.com</h3>
        </div>
      </div>

      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <div className="inp-top">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Your Phone *"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
