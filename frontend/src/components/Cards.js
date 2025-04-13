import "../css1/Cards.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, onClick }) => (
  <div className="card" onClick={onClick}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

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
      title: "Project Library",
      description:
        "Browse beginner to advanced projects with GitHub and YouTube links.",
      route: "/projects",
    },

    {
      title: "Resume & AI Tools",
      description:
        "Use our AI-powered tools to generate resumes and prepare for interviews.",
      route: "/tools",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section className="cards">
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

export default Cards;
