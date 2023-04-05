import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayUserMealsList from "../../components/DisplayMealsList/DisplayUserMealsList";
import useAuth from "../../hooks/useAuth";
import { useOutletContext, Link } from "react-router-dom";
import "./UserMealsList.css";
import { URL_HOST } from "../../urlHost";
import EmptyUserMealList from "./EmptyUserMealList";

const UserMealsList = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();
  const [meals, setMeals] = useState();
  const [user, token] = useAuth();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      let response = await axios.get(`${URL_HOST}/api/meals/user/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setMeals(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="tableContainter">
      {!meals || meals.length < 1 ? (
        <EmptyUserMealList />
      ) : (
        <table className="useMealsTable">
          <thead>
            <tr>
              <th className="userMealsTh">Scheduled</th>
              <th className="userMealsTh">Meal</th>
              <th className="userMealsTh">Recipe <i className="fa-solid fa-link"></i></th>
              <th className="userMealsTh">Time</th>
              <th className="userMealsTh">
                <Link className="tableAddMealLink" to="/createMeal">Add</Link>
                <span className="editMeals">
                  <button
                    className="noBorder"
                    type="button"
                    onClick={() => setIsDelete(!isDelete)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {meals &&
              meals.map((meal) => (
                <Fragment key={meal.id}>
                  <DisplayUserMealsList
                    meal={meal}
                    scheduleId={schedule && schedule.id}
                    scheduledMeals={scheduledMeals}
                    getScheduledMeals={getScheduledMeals}
                    isDelete={isDelete}
                    fetchMeals={fetchMeals}
                    removeMealFromSchedule={removeMealFromSchedule}
                  />
                </Fragment>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserMealsList;
