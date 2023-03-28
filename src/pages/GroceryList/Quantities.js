import { useOutletContext, Link } from "react-router-dom";

const MealCount = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1;
  let counter2 = 0;
  return (
    <div className="quantitiesContainer">
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
            <th className="groceriesTh">Quantities</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.123)}`}>
                <td className="quantitiesTd">
                  <label>
                    <input type="checkbox" /> {item.name}
                  </label>
                </td>
                <td className="quantitiesTd">
                  {/* <ol> */}
                  {item &&
                    item.meals.map((meal) => (
                      <p className="quantitiesP" key={(counter += 0.123)}>
                        <Link to={`/meal/${meal.id}`}>
                          {meal.quantity === 0 ? "" : meal.quantity}{" "}
                          {meal.unit}
                        </Link>
                      </p>
                    ))}
                  {/* </ol> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealCount;
