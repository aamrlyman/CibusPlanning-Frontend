import AddIngredient from "../AddIngredient/AddIngredient";
import DisplayIngredients from "../DisplayIngredients/DisplayIngredients";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Fragment } from "react";
import EditIngredients from "../../components/EditIngredients/EditIngredients";
import { URL_HOST } from "../../urlHost";

const Ingredients = ({ meal }) => {
  const [ingredients, setIngredients] = useState();
  const { mealId } = useParams();
  const [user, token] = useAuth();
  const [editIngredientId, setEditIngredientId] = useState(null);
  const [editIngredient, setEditIngredient] = useState({
    name: "",
    unit: "",
    quantity: 0,
    meal_id: mealId,
  });
  const [isAddIngredient, setIsAddIngredient] = useState(false);

  async function fetchIngredients() {
    try {
      let response = await axios.get(
        `${URL_HOST}/api/ingredients/meal_id/${mealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIngredients(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleEditClick = (ingredient) => {
    setEditIngredientId(ingredient.id);
  };

  const handleCancelClick = () => {
    setEditIngredientId(null);
  };

  return (
    <div>
      {ingredients &&
        ingredients.map((ingredient) =>
          editIngredientId === ingredient.id ? (
            <EditIngredients
              ingredient={ingredient}
              editIngredient={editIngredient}
              setEditIngredient={setEditIngredient}
              setEditIngredientId={setEditIngredientId}
              key={ingredient.id + "Eingre"}
              handleCancelClick={handleCancelClick}
              fetchIngredients={fetchIngredients}
            />
          ) : (
            <DisplayIngredients
              meal={meal}
              ingredient={ingredient}
              fetchIngredients={fetchIngredients}
              handleEditClick={handleEditClick}
              key={ingredient.id + "Dingre"}
            />
          )
        )}
      {!isAddIngredient ? (
        <button
          className="noBorder"
          type="button"
          onClick={() => setIsAddIngredient(!isAddIngredient)}
        >
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      ) : (
        <AddIngredient
          key={meal.id + "add"}
          meal={meal}
          fetchIngredients={fetchIngredients}
          isAddIngredient={isAddIngredient}
          setIsAddIngredient={setIsAddIngredient}
        />
      )}
    </div>
  );
};

export default Ingredients;
