import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayUserMealsList from "../../components/DisplayMealsList/DisplayUserMealsList";
import useAuth from "../../hooks/useAuth";
import { useOutletContext, Link } from "react-router-dom";
import "./UserMealsList.css";
import { URL_HOST } from "../../urlHost";

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
        <div className="homePageFillerDiv">
          <p className="firstLineP">You don't have any custom meals!</p>
          <p className="secondLineP">
            Click the{" "}
            <Link style={{ fontSize: "1.75rem" }} to="/createMeal">
              +
            </Link>{" "}
            to create custom meals of your own.{" "}
          </p>
          <br />
          <p className="thirdlineP">
            Edit or delete your meals by clicking the{" "}
            <span style={{ color: "#7c262b" }}>
              <i className="fa-solid fa-pencil"></i>
            </span>{" "}
            or the <Link to="">meal name</Link>.
          </p>
        </div>
      ) : (
        <table className="useMealsTable">
          <thead>
            <tr>
              <th className="userMealsTh">Scheduled</th>
              <th className="userMealsTh">Meal</th>
              <th className="userMealsTh">Recipe Url</th>
              <th className="userMealsTh">Time</th>
              <th className="userMealsTh">
                Add
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
