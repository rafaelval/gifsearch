import { useState } from "react";
import { AddCategory } from "./Components/AddCategory";
import { Categories } from "./Components/Categories";
import { GifGrid } from "./Components/GifGrid";
import { AiOutlineClear } from "react-icons/ai";
import { Footer } from "./Components/Footer";

export const App = () => {
  const [searchQueries, setSearchQueries] = useState([]);

  const onAddCategory = (newCategory) => {
    if (searchQueries.includes(newCategory)) return;
    setSearchQueries([newCategory, ...searchQueries]);
  };

  const clean = () => {
    setSearchQueries([]);
  };

  return (
    <div>
      <h1 className="comic-neue-bold">Encuentra tus mejores gifs</h1>
      <Categories onCategoryClick={onAddCategory} />
      <AddCategory onNewCategory={onAddCategory} />
      <button onClick={clean}>
        <AiOutlineClear />
      </button>
      <GifGrid category="Trending" />
      {searchQueries.map((query) => (
        <GifGrid key={query} category={query} />
      ))}
      <Footer />
    </div>
  );
};
