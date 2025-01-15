import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import { Link } from "react-router-dom";
import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

const DisplayMealsList = ({
  scheduleId,
  meal,
  getScheduledMeals,
  scheduledMeals,
  removeMealFromSchedule,
}) => {
  const [user, token] = useAuth();

  return (
    <tr>
      <td className="allMealsTd">
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </td>
      <td className="allMealsTd">
        <Link to={meal && `/meal/${meal.id}/`}> {meal.name}</Link>
      </td>
      <td className="allMealsTd">
      {meal.url? (
          <a href={meal.url}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        ) : (
          <a className="noLink">No Link Available</a>
        )}
      </td>
      <td className="mealtimesTd">
        <DisplayTimes meal={meal} />
      </td>
      <td className="allMealsTd">
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
          <AddMealToScheduleButton
            scheduleId={scheduleId}
            scheduledMeals={scheduledMeals}
            meal={meal}
            getScheduledMeals={getScheduledMeals}
          />
        )}
      </td>
    </tr>
  );
};
export default DisplayMealsList;
