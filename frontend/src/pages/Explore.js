import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageSrc from "../assests/pexels-photo-1326947.webp";
import "../css/Explore.css"; // Unified stylesheet

// Main Home Component
const Explore = () => {
  useEffect(() => {
    document.title = "SkillSphere | Explore";
  }, []);
  return (
    <div className="home-container">
      <Header />
      <Hero />
      <Cards />
    </div>
  );
};

// Header Component
const Header = () => (
  <header className="header">
    <div className="header-text-content">
      <h1 className="header-title">SkillNova</h1>
      <p className="header-subtitle">Learn. Build. Get Placed.</p>
    </div>
    <img src={imageSrc} alt="Study" className="header-image" />
  </header>
);

// Hero Component
const Hero = () => (
  <section className="hero">
    <h1 className="hero-title">Empowering Students with the Right Resources</h1>
    <p className="hero-description">
      Access handpicked courses, guided roadmaps, real-world projects, and AI
      tools – all in one place.
    </p>
  </section>
);

// Card Component
const Card = ({ title, description, onClick }) => (
  <div className="card" onClick={onClick}>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

// Cards Component
const Cards = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Top Courses",
      description:
        "Explore DSA, Web Dev, Mobile Dev, AI, and Cybersecurity from top YouTube educators.",
      route: "/courses",
    },
    {
      title: "Knowledge Assessment Test",
      description:
        "Take this test to evaluate your current skills. Based on your results, we'll generate a personalized learning roadmap to help you grow.",
      route: "/tests",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section className="cards-container">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          onClick={() => handleCardClick(card.route)}
        />
      ))}
    </section>
  );
};

export default Explore;
