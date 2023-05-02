import { useOutletContext, Link } from "react-router-dom";
import { Fragment } from "react";

const MealCount = () => {
  const [groceryList] = useOutletContext();
  let counter = 0;
  return (
    <div className="mealCountContainer">
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
            <th className="groceriesTh">Meal Names</th>
            <th className="groceriesTh"># of Meals</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.98989)}`}>
                <td className="mealNamesTd">
                  <label>
                    <input type="checkbox" /> {item.name}
                  </label>
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
