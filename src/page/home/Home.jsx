import Categories from "../../components/categories/Categories";
import Discount from "../../components/discount/Discount";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import Pros from "../../components/prosOfCompany/Pros";
import Speaker from "../../components/speaker/Speaker";

const Home = () => {
  return (
    <main>
      <title>Home Page</title>
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
