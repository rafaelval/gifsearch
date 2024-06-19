import React, { useState } from "react";
import { AddCategory } from "./Components/AddCategory";
import { GifGrid } from "./Components/GifGrid";
import { AiOutlineClear } from "react-icons/ai";
import { Footer } from "./Components/Footer";

export const App = () => {
  const [categories, setCategories] = useState([]);

  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return;
    setCategories([newCategory, ...categories]);
  };

  const clean = () => {
    setCategories([]);
  };

  return (
    <div>
      <h1 className="comic-neue-bold">Encuentra tus mejores gifs</h1>
      <AddCategory onNewCategory={onAddCategory} />
      <button onClick={clean}>
        <AiOutlineClear />
      </button>
      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
      <Footer />
    </div>
  );
};
