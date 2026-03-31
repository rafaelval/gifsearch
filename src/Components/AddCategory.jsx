import React, { useState } from "react";

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length <= 1) return;
    onNewCategory(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmit} className="add-category-form">
      <input
        type="text"
        placeholder="Buscar gifs..."
        value={inputValue}
        onChange={onInputChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};
