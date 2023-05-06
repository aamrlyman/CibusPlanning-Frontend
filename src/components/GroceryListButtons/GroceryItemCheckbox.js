import React, { useState } from "react";
import "./GroceryListButtons.css";

const GroceryItemCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkboxContainer">
      <input
        className={isChecked ? "checked" : ""}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </div>
  );
};

export default GroceryItemCheckBox;
