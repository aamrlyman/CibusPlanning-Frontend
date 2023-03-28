import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditMeal from "../EditMeal/EditMeal";
import DisplayUserMeal from "../../components/DisplayUserMeal/DisplayUserMeal";
import Ingredients from "../../components/Ingredients/Ingredients";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./UserMeal.css";
import { URL_HOST } from "../../urlHost";

const UserMeal = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();

  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [meal, setMeal] = useState();
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    setIsEdit(true);
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    try {
      let response = await axios.get(
        `${URL_HOST}/api/meals/${mealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMeal(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mealAndEditViewContainer">
      {isEdit && meal ? (
        <div className="editMealAndIngredientContainer">
          <EditMeal meal={meal} setIsEdit={setIsEdit} fetchMeal={fetchMeal} />
          {meal && (
          <div className="editIngredientsContainer">
            <h2>Ingredients</h2>
            <Ingredients key={mealId + "ing"} meal={meal} />
          </div>
        )}       
        </div>
      ) : (
        <DisplayUserMeal
        meal={meal}
        scheduleId={schedule && schedule.id}
        getScheduledMeals={getScheduledMeals}
        scheduledMeals={scheduledMeals}
        setIsEdit={setIsEdit}
        removeMealFromSchedule={removeMealFromSchedule}
        />
        )}
    </div>
  );
};

export default UserMeal;
