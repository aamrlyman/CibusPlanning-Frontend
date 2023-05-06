import { Fragment, useState } from "react";
import { useOutletContext } from "react-router-dom";
import RemoveItemButton from "../../components/GroceryListButtons/RemoveItemButton";
import GroceryItemCheckBox from "../../components/GroceryListButtons/GroceryItemCheckbox";

const IngredientsOnly = () => {
  const [groceryList, setGroceryList] = useOutletContext();
  let counter = 1.1;
  return (
    <div className="ingredientsOnlyContainer">
      <table className="groceriesTable">
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item, index) => (
              <tr key={`${item.id} + ${(counter += 0.12312)} `}>
                <td className="groceriesTd">
                  <div className="groceryListButtonsContainer">
                  <RemoveItemButton
                    groceryList={groceryList}
                    index={index}
                    setGroceryList={setGroceryList}
                  />
                  <label>
                    <GroceryItemCheckBox />
                    {item.name}
                  </label>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsOnly;
