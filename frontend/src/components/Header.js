import "../css/Header.css";
import imageSrc from "../assests/pexels-photo-1326947.webp"; // Adjust the path if needed

const Header = () => (
  <header className="header">
    <div className="text-content">
      <h1>SkillNova</h1>
      <p>Learn. Build. Get Placed.</p>
    </div>
    <img src={imageSrc} alt="Study" className="header-img" />
  </header>
);

export default Header;
