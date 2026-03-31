import React from "react";

export const GifItem = ({ title, url, description }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={url} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h4 className="card-title" title={title}>{title}</h4>
        {description && <p className="card-description">{description}</p>}
      </div>
    </div>
  );
};
