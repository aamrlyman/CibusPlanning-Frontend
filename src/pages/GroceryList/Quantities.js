import { useOutletContext, Link } from "react-router-dom";
import GroceryItemCheckBox from "../../components/GroceryListButtons/GroceryItemCheckbox";
import RemoveItemButton from "../../components/GroceryListButtons/RemoveItemButton"

const MealCount = () => {
  const [groceryList, setGroceryList] = useOutletContext();
  let counter = 1;
  let counter2 = 0;
  return (
    <div className="quantitiesContainer">
      <table className="groceriesTable">
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
            <th className="groceriesTh">Quantities</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item, index) => (
              <tr key={`${item.id} + ${(counter += 1.123)}`}>
                <td className="quantitiesTd">
                <div className="groceryListButtonsContainer">
                  <RemoveItemButton
                    groceryList={groceryList}
                    index={index}
                    setGroceryList={setGroceryList}
                  />
                  <label>
                    <GroceryItemCheckBox />{item.name}
                  </label>
                  </div>
                </td>
                <td className="quantitiesTd">
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
