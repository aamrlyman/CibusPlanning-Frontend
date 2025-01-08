import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        value={searchString}
        onChange={handleInputChange}
        placeholder="Search for meals..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => fetchMeals()}>reset search</button>
    </div>
  );
};

export default MealsSearchBar;
