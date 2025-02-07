// src/components/Card.js
import React, { useEffect } from "react";

const Card = ({ image, title, excerpt, isEmpty }) => {
  useEffect(() => {
    
  }, [image]);

  return (
    <div className={`card ${isEmpty ? "empty" : ""}`}>
      <div
        className="card-image-container"
        style={{ width: "100%", height: "200px", overflow: "hidden" }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="card-image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : (
          <div
            className="empty-overlay"
            style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }}
          ></div>
        )}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </div>
  );
};

export default Card;
