import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./DuplicateMealButton.css";
import { URL_HOST } from "../../urlHost";

const DuplicateMealButton = ({meal}) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  
  //example from James for how I can set up api context that has headers and url so I don't have to repeat so much code
  const { mealId } = useParams();
  const { apiClient } = //useContext();
  {
    apiClient: 
    {
      get: async function(apiRoute) {
        return await axios.get(
          `${URL_HOST}${apiRoute}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      },
      post: async function(apiRoute, body) {
        return await axios.post(
          `${URL_HOST}${apiRoute}`,
          body,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
    }
  };

  async function fetchIngredients() {
    try {
      let response = await apiClient.get(`/api/ingredients/meal_id/${mealId}/`)
       
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function postIngredient(ingredient, duplicatedMealId) {
    try {
      let response = await apiClient.post(`/api/ingredients/meal_id/${duplicatedMealId}/`,
        {...ingredient, meal_id:duplicatedMealId}
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function duplicateIngredients(duplicatedMealId) {
    const ingredients = await fetchIngredients();
    const postIngredientPromises = ingredients.map(ingredient => postIngredient(ingredient, duplicatedMealId));
    await Promise.all(postIngredientPromises);
  }

  async function duplicateMealAndIngredientsAlertUser() {
    try {
      const mealCopy = {...meal, name: "Copy of " + meal.name};
      let response = await apiClient.post(`/api/meals/user/`,mealCopy);
      console.log(response.data);
      await duplicateIngredients(response.data.id);
      alert(`${response.data.name} has been created`);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="duplicateButtonContainer">
      <button className="noBorderLessPaddingBtn" onClick={() => duplicateMealAndIngredientsAlertUser()}><i className="fa-solid fa-copy"></i></button>
    </div>
  );
};

export default DuplicateMealButton;

