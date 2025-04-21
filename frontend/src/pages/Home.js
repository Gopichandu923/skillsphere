import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

function HeroSection() {
  return (
    <main className="hero-container">
      <section className="inspirational-quote">
        <blockquote className="quote-text">
          "Education is the most powerful weapon you can use to change the
          world."
        </blockquote>
        <p className="quote-author">- Nelson Mandela</p>
      </section>
      <div className="cta-container">
        <Link to="/explore" className="cta-button">
          Explore Resources
        </Link>
      </div>
    </main>
  );
}

function ContactSection() {
  return (
    <footer className="contact-container">
      <h2 className="contact-heading">Get In Touch</h2>
      <div className="contact-info-grid">
        <div className="contact-info-item">
          <div className="contact-icon email-icon"></div>
          <a href="mailto:info@skillsphere.com" className="contact-link">
            info@skillsphere.com
          </a>
        </div>
        <div className="contact-info-item">
          <div className="contact-icon phone-icon"></div>
          <p className="contact-detail">+91-9876543210</p>
        </div>
        <div className="contact-info-item">
          <div className="contact-icon location-icon"></div>
          <p className="contact-detail">Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="page-wrapper">
      <HeroSection />
      <ContactSection />
    </div>
  );
}

export default App;
