import React, { useState, useEffect } from "react";

const GroceryListButtons = ({ groceryList, setGroceryList, index }) => {
  const [isChecked, setIsChecked] = useState(false);
  const removeGroceryItem = (index) => {
    setGroceryList([
      ...groceryList.slice(0, index),
      ...groceryList.slice(index + 1, groceryList.length),
    ]);
  };

  return (
    <div>
      <button
        onClick={() => removeGroceryItem(index)}
        style={{ fontSize: "1rem", border: "none" }}
      >
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      {isChecked ? (
        <button
          style={{ fontSize: "1rem", border: "none" }}
        //   className="noBorder"
          onClick={() => setIsChecked(false)}
        >
          <i className="fa-regular fa-square-check"></i>
        </button>
      ) : (
        <button
          style={{ fontSize: "1rem", border: "none" }}
        //   className="noBorder"
          onClick={() => setIsChecked(true)}
        >
          <i className="fa-regular fa-square"></i>
        </button>
      )}
    </div>
  );
};

export default GroceryListButtons;
