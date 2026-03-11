import { BsShop } from "react-icons/bs";
import girls from "../../assets/girlsshop.png";
import "./About.css";
import { FaSackDollar } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { ImCoinDollar } from "react-icons/im";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Pros from "../../components/prosOfCompany/Pros";

const About = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("stat_sellers");

  const cards = [
    { id: 1, icon: <BsShop />, amount: "10.5k", titleKey: "stat_sellers" },
    { id: 2, icon: <ImCoinDollar />, amount: "33k", titleKey: "stat_sales" },
    {
      id: 3,
      icon: <LuShoppingBag />,
      amount: "45.5k",
      titleKey: "stat_customers",
    },
    { id: 4, icon: <FaSackDollar />, amount: "25k", titleKey: "stat_gross" },
  ];

  const workers = [
    {
      id: 1,
      name: "Tom Cruise",
      jobKey: "job_founder",
      image:
        "https://static.vecteezy.com/system/resources/previews/046/318/972/non_2x/smiling-asian-man-in-traditional-attire-on-transparent-background-png.png",
    },
    {
      id: 2,
      name: "Emma Watson",
      jobKey: "job_director",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/050/817/792/small/happy-smiling-business-woman-in-suit-with-hand-pointing-at-empty-space-standing-isolate-on-transparent-background-png.png",
    },
    {
      id: 3,
      name: "Will Smith",
      jobKey: "job_designer",
      image:
        "https://static.vecteezy.com/system/resources/previews/011/787/584/non_2x/handsome-and-smart-businessman-in-suit-and-white-shirt-relaxing-on-isolatred-on-yellow-background-free-png.png",
    },
    {
      id: 4,
      name: "Cristiano Ronaldo",
      jobKey: "job_cleaner",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/035/881/394/small/ai-generated-businessman-isolated-on-transparent-background-free-png.png",
    },
    {
      id: 5,
      name: "Irina Sheyk",
      jobKey: "job_designer",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/068/438/498/small/a-beautiful-business-woman-in-a-suit-png.png",
    },
    {
      id: 6,
      name: "Lionel Messi",
      jobKey: "job_manager",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/026/136/056/small/business-man-illustration-ai-generative-png.png",
    },
  ];

  return (
    <main className="container about-wrap">
      <title>{t("about_title_tab")}</title>

      <section className="story-wrap">
        <div className="story-left">
          <h2>{t("our_story")}</h2>
          <p>{t("story_p1")}</p>
          <p>{t("story_p2")}</p>
        </div>
        <div className="story-right">
          <img src={girls} alt="" />
        </div>
      </section>

      <section className="statistics">
        {cards.map((item) => (
          <div
            key={item.id}
            className={`card-statistics ${item.titleKey === active ? "active" : "non-active"}`}
            onClick={() => setActive(item.titleKey)}
          >
            <div>
              <span className="outer">
                <span className="inner-icon">{item.icon}</span>
              </span>
              <h3>{item.amount}</h3>
              <p>{t(item.titleKey)}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="workers">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="newSwip"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {workers.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="slider-top">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="slider-bottom">
                <h3>{item.name}</h3>
                <h4>{t(item.jobKey)}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Pros />
    </main>
  );
};

export default About;
