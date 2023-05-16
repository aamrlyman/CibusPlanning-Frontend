import { useOutletContext, Link } from "react-router-dom";
import { Fragment } from "react";
import GroceryItemCheckBox from "../../components/GroceryListButtons/GroceryItemCheckbox";
import RemoveItemButton from "../../components/GroceryListButtons/RemoveItemButton";

const MealCount = () => {
  const [groceryList, setGroceryList] = useOutletContext();
  let counter = 0;
  return (
    <div className="mealCountContainer">
      <table className="groceriesTable">
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
            <th className="groceriesTh">Meal Names</th>
            <th className="groceriesTh"># of Meals</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item, index) => (
              <tr key={`${item.id} + ${(counter += 1.98989)}`}>
                <td className="mealCountTd">
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
                <td className="mealNamesTd">
                  {item &&
                    item.meals.map((meal) => (
                      <p className="mealNamesP" key={`${(counter += 0.1233)}`}>
                        <Link to={`/meal/${meal.id}`}>{meal.name}</Link>
                      </p>
                    ))}
                </td>
                <td className="mealCountTd">{item.meals.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealCount;
