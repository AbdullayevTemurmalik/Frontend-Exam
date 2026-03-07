import Categories from "../../components/categories/Categories";
import Discount from "../../components/discount/Discount";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import Pros from "../../components/prosOfCompany/Pros";
import Speaker from "../../components/speaker/Speaker";
// import helmet from "helmet";

const Home = () => {
  return (
    <main>
      <helmet>
        <title>Home Page</title>
      </helmet>
      <Hero />
      <Discount />
      <Categories />
      <Products />
      <Speaker />
      <Pros />
    </main>
  );
};

export default Home;
