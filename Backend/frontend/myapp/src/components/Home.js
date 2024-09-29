import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="intro">
        <h1 className="title">Welcome to Book Management System</h1>
        <p className="tagline">Organize, Manage, and Explore Your Books Seamlessly</p>
        <a href="/form" className="cta-btn">Get Started</a>
      </div>
    </div>
  );
};

export default Home;
