import { BsShop } from "react-icons/bs";
import girls from "../../assets/girlsshop.png";
import "./About.css";
import { FaSackDollar } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { ImCoinDollar } from "react-icons/im";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Pros from "../../components/prosOfCompany/Pros";
const About = () => {
  const [active, setActive] = useState("Sallers active our site");
  const cards = [
    {
      id: 1,
      icon: <BsShop />,
      amount: "10.5k",
      title: "Sallers active our site",
    },
    {
      id: 2,
      icon: <ImCoinDollar />,
      amount: "33k",
      title: "Mopnthly Produduct Sale",
    },
    {
      id: 3,
      icon: <LuShoppingBag />,
      amount: "45.5k",
      title: "Customer active in our site",
    },
    {
      id: 4,
      icon: <FaSackDollar />,
      amount: "25k",
      title: "Anual gross sale in our site",
    },
  ];
  const workers = [
    {
      id: 1,
      name: "Tom Cruise",
      job: "Founder & Chairman",
      image:
        "https://static.vecteezy.com/system/resources/previews/046/318/972/non_2x/smiling-asian-man-in-traditional-attire-on-transparent-background-png.png",
    },
    {
      id: 2,
      name: "Emma Watson",
      job: "Managing Director",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/050/817/792/small/happy-smiling-business-woman-in-suit-with-hand-pointing-at-empty-space-standing-isolate-on-transparent-background-png.png",
    },
    {
      id: 3,
      name: "Will Smith",
      job: "Product Designer",
      image:
        "https://static.vecteezy.com/system/resources/previews/011/787/584/non_2x/handsome-and-smart-businessman-in-suit-and-white-shirt-relaxing-on-isolatred-on-yellow-background-free-png.png",
    },
    {
      id: 4,
      name: "Cristiano Ronaldo",
      job: "Main cleaner",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/035/881/394/small/ai-generated-businessman-isolated-on-transparent-background-free-png.png",
    },
    {
      id: 5,
      name: "Irina Sheyk",
      job: "Designer",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/068/438/498/small/a-beautiful-business-woman-in-a-suit-png.png",
    },
    {
      id: 6,
      name: "Lionel Messi",
      job: "Manager",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/026/136/056/small/business-man-illustration-ai-generative-png.png",
    },
  ];
  return (
    <main className="container about-wrap">
      <helmet>
        <title>About Page</title>
      </helmet>
      <section className="story-wrap">
        <div className="story-left">
          <h2>Our Story</h2>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{" "}
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="story-right">
          <img src={girls} alt="" />
        </div>
      </section>
      <section className="statistics">
        {cards.map((item) => {
          return (
            <div
              key={item.id}
              className={`card-statistics ${
                item.title === active ? "active" : "non-active"
              }`}
              onClick={() => setActive(item.title)}
            >
              <div>
                <span className="outer">
                  <span>{item.icon}</span>
                </span>
                <h3>{item.amount}</h3>
                <p>{item.title}</p>
              </div>
            </div>
          );
        })}
      </section>
      <section className="workers">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="newSwip"
        >
          {workers.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="slider-top">
                  <img src={item.image} alt="" />
                </div>
                <div className="slider-bottom">
                  <h3>{item.name}</h3>
                  <h4>{item.job}</h4>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <Pros />
    </main>
  );
};

export default About;
