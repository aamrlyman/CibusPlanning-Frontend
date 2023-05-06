import React, { useState, useEffect } from "react";
import "./GroceryListButtons.css";

const RemoveItemButton = ({ groceryList, setGroceryList, index }) => {
  const removeGroceryItem = (index) => {
    setGroceryList([
      ...groceryList.slice(0, index),
      ...groceryList.slice(index + 1, groceryList.length),
    ]);
  };

  return (
    <i
      className="fa-solid fa-circle-xmark groceryXI"
      onClick={() => removeGroceryItem(index)}
    ></i>
  );
};

export default RemoveItemButton;
