import React, { useState } from "react";

export const GifItem = ({ title, url, description }) => {
  const [showHint, setShowHint] = useState(false);

  const handleImageClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img 
          src={url} 
          alt={title} 
          className="card-image" 
          onClick={handleImageClick}
          title="Click para copiar la URL"
        />
        {showHint && <div className="copy-hint">¡Copiado!</div>}
      </div>
      <div className="card-content">
        <h4 className="card-title" title={title}>{title}</h4>
        {description && <p className="card-description">{description}</p>}
      </div>
    </div>
  );
};
