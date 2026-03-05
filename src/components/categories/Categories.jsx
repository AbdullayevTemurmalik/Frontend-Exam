import "./Categories.css";
import { useState } from "react";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
} from "lucide-react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("Camera");

  const categories = [
    { name: "Phones", icon: <Smartphone size={40} strokeWidth={1.5} /> },
    { name: "Computers", icon: <Monitor size={40} strokeWidth={1.5} /> },
    { name: "SmartWatch", icon: <Watch size={40} strokeWidth={1.5} /> },
    { name: "Camera", icon: <Camera size={40} strokeWidth={1.5} /> },
    { name: "HeadPhones", icon: <Headphones size={40} strokeWidth={1.5} /> },
    { name: "Gaming", icon: <Gamepad2 size={40} strokeWidth={1.5} /> },
  ];

  return (
    <div className="container categories-section">
      <div className="section-title">
        <span className="red-rectangle"></span>
        <p>Categories</p>
      </div>
      <div className="browse-header">
        <h3>Browse By Category</h3>
      </div>
      <div className="categories-grid">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`category-box ${activeCategory === item.name ? "active" : ""}`}
            onClick={() => setActiveCategory(item.name)}
          >
            <span className="category-icon">{item.icon}</span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="section-divider" />
    </div>
  );
};

export default Categories;
