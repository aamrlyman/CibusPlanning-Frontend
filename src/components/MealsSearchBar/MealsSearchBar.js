import React, { useState } from "react";
import "./MealsSearchBar.css";

const MealsSearchBar = ({ meals, setMeals, fetchMeals }) => {
  const [searchString, setSearchString] = useState("");

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = () => {
    const filteredMeals = meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setMeals(filteredMeals);
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        value={searchString}
        onChange={handleInputChange}
        placeholder="Search for meals..."
        className="searchBarInput"
      />
      <button onClick={handleSearch}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <button onClick={() => fetchMeals()}>
        <i class="fa-solid fa-rotate"></i>
      </button>
    </div>
  );
};

export default MealsSearchBar;
