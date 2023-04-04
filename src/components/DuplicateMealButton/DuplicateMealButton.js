import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./DuplicateMealButton.css";
import { URL_HOST } from "../../urlHost";

const DuplicateMealButton = (meal) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState();
  const { mealId } = useParams();

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

  async function postIngredient(ingredient, duplicatedMealId) {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/ingredients/meal_id/${duplicatedMealId}/`,
        {
          name: ingredient.name,
          unit: 0,
          quantity: ingredient.quantity,
          meal_id: duplicatedMealId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function duplicateIngredients(duplicatedMealId) {
    for (const ingredient of ingredients) {
      console.log(ingredient);
      postIngredient(ingredient, duplicatedMealId);
    }
  }

  function alertUser(duplicatedMealName) {
    alert(`${duplicatedMealName} has been created`);
  }

  async function duplicateMealAndIngredientsAlertUser() {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/meals/user/`,
        {
          name: "Copy of " + meal.meal.name,
          notes: meal.meal.notes,
          url: meal.meal.url,
          prep_time_minutes: meal.meal.prep_time_minutes,
          prep_time_hours: meal.meal.prep_time_hours,
          cook_time_minutes: meal.meal.cook_time_minutes,
          cook_time_hours: meal.meal.prep_time_hours,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      duplicateIngredients(response.data.id);
      alertUser(response.data.name);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {ingredients && (
        <button className="noBorder" onClick={() => duplicateMealAndIngredientsAlertUser()}><i className="fa-solid fa-copy"></i></button>
      )}
    </div>
  );
};

export default DuplicateMealButton;

