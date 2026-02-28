import { GiBanana, GiClothes } from "react-icons/gi";
import "./Categories.css";
import { FaBorderAll } from "react-icons/fa";
import { PiPhone } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { MdOutlineToys } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { name } from "../../redux/filterSlice";
const Categories = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    {
      name: "all",
      icon: <FaBorderAll />,
    },
    {
      name: "cloth",
      icon: <GiClothes />,
    },
    {
      name: "devices",
      icon: <PiPhone />,
    },
    {
      name: "furniture",
      icon: <LuSofa />,
    },
    {
      name: "toys",
      icon: <MdOutlineToys />,
    },
    {
      name: "food",
      icon: <GiBanana />,
    },
  ];
  return (
    <div className="container">
      <div className="section-title">
        <span className="red-rectangle"></span>
        <p>Categories</p>
      </div>
      <div className="sales-count-wrap">
        <h3>Browse By Category</h3>
      </div>
      <div className="categories-wrap">
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className={`category-item ${
                activeCategory === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(item.name);
                dispatch(name(item.name));
              }}
            >
              <div>
                <span className="huge-icon">{item.icon}</span>
                <h3>{item.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
