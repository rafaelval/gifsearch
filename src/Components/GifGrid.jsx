import React, { useState } from "react";
import useFetchGifs from "../Hooks/useFetchGifs";
import { GifItem } from "./GifItem";

export const GifGrid = ({ category }) => {
  const { images, isLoading, page, setPage, hasNextPage } = useFetchGifs(category);
  const [trendingOpen, setTrendingOpen] = useState(false);


  if (category === "Trending") {
    return (
      <div className="trending-section">
        <button 
          className="trending-header"
          onClick={() => setTrendingOpen(!trendingOpen)}
        >
          <span>Trending</span>
          <span className={`arrow ${trendingOpen ? 'open' : ''}`}>▼</span>
        </button>
        
        {trendingOpen && (
          <div className="trending-content">
            {isLoading && <h2>Cargando...</h2>}
            <div className="card-grid">
              {images.map((image) => (
                <GifItem key={image.id} {...image} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

 
  return (
    <>
      <h3>{category}</h3>
      {isLoading && <h2>Cargando...</h2>}
      <div className="card-grid">
        {images.map((image) => (
          <GifItem key={image.id} {...image} />
        ))}
      </div>

      {/* Paginación */}
      {images.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="pagination-btn"
          >
            ← Anterior
          </button>
          <span className="page-info">Página {page}</span>
          <button 
            onClick={() => setPage(page + 1)}
            disabled={!hasNextPage}
            className="pagination-btn"
          >
            Siguiente →
          </button>
        </div>
      )}
    </>
  );
};
