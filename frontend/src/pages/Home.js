import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import "../css/Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
