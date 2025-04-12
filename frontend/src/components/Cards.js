import "../css/Cards.css";
const Card = ({ title, description }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Cards = () => {
  const cardData = [
    {
      title: "Top Courses",
      description:
        "Explore DSA, Web Dev, Mobile Dev, AI, and Cybersecurity from top YouTube educators.",
    },
    {
      title: "Project Library",
      description:
        "Browse beginner to advanced projects with GitHub and YouTube links.",
    },
    {
      title: "Roadmaps",
      description:
        "Follow clear, curated career roadmaps from multiple trusted sources.",
    },
    {
      title: "Resume & AI Tools",
      description:
        "Use our AI-powered tools to generate resumes and prepare for interviews.",
    },
  ];

  return (
    <section className="cards">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </section>
  );
};

export default Cards;
