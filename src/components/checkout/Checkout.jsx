import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.basket.value);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    saveInfo: false,
    couponCode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();

    const BOT_TOKEN = "8443183876:AAFbzKHVIYZx5512mK7Q3jSwbIAQcOkathM";
    const CHAT_ID = "5387795208";

    let text = `📦 Yangi Buyurtma!\n\n`;
    text += `👤 Ism: ${formData.firstName}\n`;
    text += `🏢 Kompaniya: ${formData.companyName}\n`;
    text += `📍 Manzil: ${formData.streetAddress}, ${formData.apartment}\n`;
    text += `🏙 Shahar: ${formData.city}\n`;
    text += `📞 Telefon: ${formData.phone}\n`;
    text += `📧 Email: ${formData.email}\n`;
    text += `🎟 Kupon: ${formData.couponCode}\n\n`;
    text += `🛍 Mahsulotlar:\n`;
    cartItems.forEach((item) => {
      text += `- ${item.name} x${item.quantity} ($${item.price * item.quantity})\n`;
    });
    text += `\n💰 Umumiy summa: $${totalAmount}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      setFormData({
        firstName: "",
        companyName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phone: "",
        email: "",
        saveInfo: false,
        couponCode: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container checkout-page">
      <helmet>
        <title>Checkout Page</title>
      </helmet>
      <nav className="breadcrumb">
        Account / My Account / Product / View Cart / <span>CheckOut</span>
      </nav>

      <div className="checkout-wrapper">
        <section className="billing-section">
          <h1>Billing Details</h1>
          <form className="billing-form">
            <div className="input-field">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Street Address*</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Apartment, floor, etc. (optional)</label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Town/City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="save-info">
              <input
                type="checkbox"
                id="save"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
              />
              <label htmlFor="save">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </section>

        <aside className="order-summary-section">
          <div className="order-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-product">
                <div className="prod-info">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
                <p>${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="calculation-box">
            <div className="calc-row">
              <span>Subtotal:</span>
              <span>${totalAmount}</span>
            </div>
            <hr />
            <div className="calc-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="calc-row total-amount">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <div className="payment-options">
            <div className="pay-method">
              <div className="radio-label">
                <input type="radio" name="pay" id="bank" />
                <label htmlFor="bank">Bank</label>
              </div>
              <div className="payment-logos">
                <img
                  src="data:image/png;base64,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"
                  alt="Visa"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                  alt="Mastercard"
                />
              </div>
            </div>
            <div className="pay-method">
              <div className="radio-label">
                <input type="radio" name="pay" id="cod" defaultChecked />
                <label htmlFor="cod">Cash on delivery</label>
              </div>
            </div>
          </div>

          <div className="coupon-area">
            <input
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              placeholder="Coupon Code"
            />
            <button className="red-btn" type="button" onClick={sendToTelegram}>
              Apply Coupon
            </button>
          </div>

          <button
            className="place-order-btn"
            type="button"
            onClick={sendToTelegram}
          >
            Place Order
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
