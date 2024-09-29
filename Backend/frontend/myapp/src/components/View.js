import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './View.css'; // Custom styles for fancy design and shimmer effect

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const goBack = () => {
    navigate('/show');
  };

  if (!book) {
    return (
      <div className="view-container">
        <div className="shimmer-card">
          <div className="shimmer-title shimmer"></div>
          <div className="shimmer-text shimmer"></div>
          <div className="shimmer-text shimmer"></div>
          <button className="back-btn" onClick={goBack}>← Back to List</button>
        </div>
        <p className="no-data-message">Oops! It seems like the book data is not available.</p>
      </div>
    );
  }

  const { title, author, publishYear } = book;

  return (
    <div className="view-container">
      <div className="view-card">
        <h1 className="view-title">{title}</h1>
        <p className="view-author">Author: <strong>{author}</strong></p>
        <p className="view-year">Published: <strong>{publishYear}</strong></p>
        <button className="back-btn" onClick={goBack}>← Back to List</button>
      </div>
    </div>
  );
};

export default View;
