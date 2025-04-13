import React from "react";
import "../css/Explore.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="main">
      <section className="quote-box">
        <p>
          "Education is the most powerful weapon you can use to change the
          world."
          <br />
          <span>- Nelson Mandela</span>
        </p>
      </section>
      <div>
        <Link to="/explore">Explore</Link>
      </div>
    </main>
  );
}

function ContactSection() {
  return (
    <footer className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-items">
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <p>
            <a href="mailto:info@skillsphere.com">info@skillsphere.com</a>
          </p>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <p>+91-9876543210</p>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <p>Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <HeroSection />
      <ContactSection />
    </div>
  );
}

export default App;
