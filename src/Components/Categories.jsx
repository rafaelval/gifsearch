import { useState, useEffect, useRef } from "react";
import { getCategories } from "../Helpers/getGifs";

export const Categories = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasLoadedRef = useRef(false);

  useEffect(() => {

    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const categoryQuery = category.query || category.category;
    if (onCategoryClick) {
      onCategoryClick(categoryQuery);
    }
  };

  if (loading) {
    return <div className="categories-container">Cargando categorías...</div>;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
      
    <div className="categories-container">
      <h3>Categorías</h3>
      <div className="categories-buttons">
        {categories.slice(0, 20).map((cat, idx) => (
          <button
            key={idx}
            className="category-btn"
            onClick={() => handleCategoryClick(cat)}
            title={cat.category}
          >
            {cat.category}
          </button>
        ))}
      </div>
    </div>
  );
};
