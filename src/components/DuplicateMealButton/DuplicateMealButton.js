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

  console.log(ingredients);
  console.log(meal);

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

  async function duplicateMeal() {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/meals/user/`,
        {
          name: meal.meal.name,
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
    } catch (error) {
      console.log(error.message);
    }
  }

  async function postIngredient(ingredient, duplicatedMealId) {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/ingredients/meal_id/${duplicatedMealId}/`,
        {
            name: ingredient.name,
            unit: 0,
            quantity: ingredient.quantity,
            meal_id: duplicatedMealId
          }
     ,
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

  function duplicateIngredients(ingredients, duplicatedMealId) {
    for (const ingredient of ingredients) {
        console.log(ingredient)
      postIngredient(ingredient, duplicatedMealId);
    }
  }



  async function duplciateMealAndIngredients(ingredients) {
    await duplicateMeal();
  }

  
  return <button onClick={() => duplicateIngredients(ingredients, 7)}>Duplicate Meal</button>;
};

export default DuplicateMealButton;

//   function userAlert() {
//     altAlert(
//       '<p><span style="font-size: 12pt; color: red;">Please Visit <a title="Site Address" href="https://siteaddressgoeshere.com" target="_blank">Site Address</a> for more information</span></p>'
//     );

//     function altAlert(str) {
//       if (typeof spModal != "undefined") {
//         //for portal
//         spModal.open({
//           message: str,
//           title: "Alert",
//           buttons: [{ label: "OK", primary: true }],
//         });
//       } else {
//         //for platform
//         var gm = new GlideModal();
//         gm.setTitle("Alert");
//         gm.renderWithContent(str);
//       }
//     }
//   }
//   userAlert();