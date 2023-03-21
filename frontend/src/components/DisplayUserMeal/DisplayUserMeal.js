import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import DeleteUserMeal from "../DeleteMeal/DeleteMeal";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";
import { useNavigate } from "react-router-dom";
import DisplayAllMealIngredients from "../../components/DisplayAllMealIngredients/DisplayAllMealIngredients";
import "./DisplayUserMeal.css";
import { URL_HOST } from "../../urlHost";

const DisplayUserMeal = ({
  setIsEdit,
  meal,
  scheduleId,
  getScheduledMeals,
  scheduledMeals,
  removeMealFromSchedule,
}) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const navigate = useNavigate();

  const deleteMeal = async () => {
    try {
      let response = await axios.delete(
        `${URL_HOST}/api/meals/${mealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/userMealsList/");
      console.log(response);
    } catch (error) {
      console.log(error.message);
      alert("You can't delete a meal that is being used on a schedule");
    }
  };

  return (
    <div className="mealViewContainer">
      <div className="iconNameTimesEditContainer">
        <div className="iconContainer">
          <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
        </div>
        <div className="mealTitleContainer">
          <h1 className="mealTitle">{meal && meal.name}</h1>
        </div>
        <div className="displayTimeMealView">
          {meal ? <DisplayTimes meal={meal} /> : ""}
        </div>
        <div className="editDeleteButtonContainer">
          <button
            className="noBorder"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <DeleteUserMeal meal={meal} />
        </div>
      </div>

      <div className="ingredientAndNotesContainer">
        <DisplayAllMealIngredients />
        <div className="mealNotes">
          <h3>Notes:</h3>
          <p className="mealNotesP">{meal && meal.notes}</p>
        </div>
      </div>

      <div className="RecipeURLAndAddButtonContainer">
        <a href={meal && meal.url}> Recipe Link</a>
        {meal &&
        scheduledMeals &&
        scheduledMeals.some((sMeal) => sMeal.meal.id == meal.id) ? (
          <RemoveMealFromScheduleButton
            meal={meal}
            scheduledMeals={scheduledMeals}
            getScheduledMeals={getScheduledMeals}
            removeMealFromSchedule={removeMealFromSchedule}
            scheduleId={scheduleId}
          />
        ) : (
          meal && (
            <AddMealToScheduleButton
              meal={meal}
              scheduleId={scheduleId}
              getScheduledMeals={getScheduledMeals}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DisplayUserMeal;
