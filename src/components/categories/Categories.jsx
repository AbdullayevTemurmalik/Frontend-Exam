import "./Categories.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
} from "lucide-react";

const Categories = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("cat_camera");

  const categories = [
    { key: "cat_phones", icon: <Smartphone size={40} strokeWidth={1.5} /> },
    { key: "cat_computers", icon: <Monitor size={40} strokeWidth={1.5} /> },
    { key: "cat_smartwatch", icon: <Watch size={40} strokeWidth={1.5} /> },
    { key: "cat_camera", icon: <Camera size={40} strokeWidth={1.5} /> },
    { key: "cat_headphones", icon: <Headphones size={40} strokeWidth={1.5} /> },
    { key: "cat_gaming", icon: <Gamepad2 size={40} strokeWidth={1.5} /> },
  ];

  return (
    <div className="container categories-section">
      <div className="section-title">
        <span className="red-rectangle"></span>
        <p>{t("categories")}</p>
      </div>
      <div className="browse-header">
        <h3>{t("browse_category")}</h3>
      </div>
      <div className="categories-grid">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`category-box ${activeCategory === item.key ? "active" : ""}`}
            onClick={() => setActiveCategory(item.key)}
          >
            <span className="category-icon">{item.icon}</span>
            <p>{t(item.key)}</p>
          </div>
        ))}
      </div>
      <hr className="section-divider" />
    </div>
  );
};

export default Categories;
