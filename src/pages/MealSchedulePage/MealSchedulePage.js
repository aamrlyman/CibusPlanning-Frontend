import React, { useState, useEffect, Fragment, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import { useOutletContext, Link } from "react-router-dom";
import "./MealSchedulePage.css";
// import ScheduleIdContext from "../../context/scheduleIdContext";

const MealSchedulePage = () => {
  const [user, token] = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [
    schedule,
    scheduledMeals,
    getScheduledMeals,
    removeMealFromSchedule,
    clearSchedule,
  ] = useOutletContext();

  return (
    <div>
      <h1 className="Welcome">Welcome {user.username}!</h1>
      {!scheduledMeals || scheduledMeals.length < 1 ? (
        <div className="homePageFillerDiv">
          <p className="firstLineP">
            Looks like you haven't planned any meals yet!
          </p>
          <p className="secondLineP">
            Go to <Link to="/mealsList">All Meals</Link> and click the{" "}
            <span style={{ color: "#7c262b" }}>
            <Link to="/mealsList"><i className="fa-solid fa-circle-plus"></i></Link>
            </span>{" "}
            to add pre-made meals to your meal plan, Or Click on the{" "}
            <Link style={{ fontSize: "1.75rem" }} to="/createMeal">
              +
            </Link>{" "}
            to create and add some of your own.
          </p>
        </div>
      ) : (
        <div className="tableContainter">
          <table className="scheduleTable">
            <thead>
              <tr>
                <th className="MealScheduleTableTh">Cooked</th>
                <th className="MealScheduleTableTh">Meal</th>
                <th className="MealScheduleTableTh">Recipes</th>
                <th className="timeHeader">Time</th>
                {/* <th className="filler"></th> */}
              </tr>
            </thead>
            <tbody>
              {scheduledMeals &&
                scheduledMeals.map((meal) => (
                  <Fragment key={meal.id}>
                    <DisplayScheduledMeals
                      meal={meal}
                      getScheduledMeals={getScheduledMeals}
                      scheduleId={schedule.id}
                      scheduledMeals={scheduledMeals}
                      removeMealFromSchedule={removeMealFromSchedule}
                    />
                  </Fragment>
                ))}
            </tbody>
          </table>
          <div className="trashCanContainer">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="noBorderTrashCan"
              type="submit"
              onClick={() => clearSchedule(schedule)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
            { isHovered?
            <div className="clearScheduleToolTip">
              <span className="copyButtonSpan">Clear Meal Schedule</span>
            </div>:
            ""
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSchedulePage;
