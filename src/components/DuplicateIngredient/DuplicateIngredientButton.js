import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { URL_HOST } from "../../urlHost";

const DuplicateIngredientButton = ({
  ingredient,
  fetchIngredients,
}) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();

  async function duplicateIngredient(ingredient) {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/ingredients/meal_id/${mealId}/`,
        {
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: 0,
          meal_id: mealId
      },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return(
     <button
     onClick={()=> duplicateIngredient(ingredient)}
     className="deleteIngredientButton"
     >
     <i className="fa-solid fa-copy"></i>
     </button>
  );
};

export default DuplicateIngredientButton;
