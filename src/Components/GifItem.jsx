import React from "react";

export const GifItem = ({ title, url, description }) => {
  return (
    <div className="card">
      <img src={url} alt={title} />
      <p>{description}</p>
    </div>
  );
};
