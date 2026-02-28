import { FaTruckFast } from "react-icons/fa6";
import { FiHeadphones } from "react-icons/fi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import "./Pros.css";
const Pros = () => {
  const pros = [
    {
      id: 1,
      name: "FREE AND FAST DELIVERY",
      title: "Free delivery for all orders over $140",
      icon: <FaTruckFast />,
    },
    {
      id: 2,
      name: "24/7 CUSTOMER SERVICE",
      title: "Friendly 24/7 customer support",
      icon: <FiHeadphones />,
    },
    {
      id: 3,
      name: "MONEY BACK GUARANTEE",
      title: "We reurn money within 30 days",
      icon: <IoShieldCheckmarkSharp />,
    },
  ];
  return (
    <section className="statistics">
      {pros.map((item) => {
        return (
          <div key={item.id} className={"card-statistics   pros"}>
            <div>
              <span className="outer">
                <span>{item.icon}</span>
              </span>
              <h3>{item.name}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Pros;
