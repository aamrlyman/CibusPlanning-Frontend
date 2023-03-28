import { Fragment, useState } from "react";
import { useOutletContext } from "react-router-dom";

const IngredientsOnly = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.1;
  return (
    <div className="ingredientsOnlyContainer">
      <table className="groceriesTable">
        <thead>
        <tr>
          <td>
            <span className="checkBoxCaveat">
              *Checkboxes reset on refresh
            </span>
          </td>
        </tr>
          <tr>
            <th className="groceriesTh">Ingredients</th>
          </tr>
        </thead>
        <tbody>
        {groceryList &&
          groceryList.map((item) => (
            <tr key={`${item.id} + ${(counter += 0.12312)} `}>
              <td className="groceriesTd">
                <label>
                  <input type="checkbox" /> {item.name}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsOnly;
