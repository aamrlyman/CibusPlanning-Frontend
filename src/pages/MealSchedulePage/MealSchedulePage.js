import React, { useState, useEffect, Fragment, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import { useOutletContext, Link } from "react-router-dom";
import "./MealSchedulePage.css";
import EmptySchedule from "./EmptySchedule";
import GenericTable from "../../components/GenericTable/GenericTable";
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

  const clearScheduleAlertUser = (schedule) => {
    if (
      !window.confirm(
        "Are you sure you want to clear this schedule? This action cannot be undone."
      )
    )
      return null;
    clearSchedule(schedule);
  };

  const headers = [
    "Cooked",
    "Meal",
    <span>
      Recipe <i className="fa-solid fa-link"></i>
    </span>,
    "Time",
  ];
  return (
    <div>
      <h1 className="Welcome">Welcome {user.username}!</h1>
      {!scheduledMeals || scheduledMeals.length < 1 ? (
        <EmptySchedule />
      ) : (
        <div className="tableContainter">
          <GenericTable
            headers={headers}
            data={scheduledMeals}
            renderRow={(meal, index) => (
              <DisplayScheduledMeals
                meal={meal}
                getScheduledMeals={getScheduledMeals}
                scheduleId={schedule.id}
                scheduledMeals={scheduledMeals}
                removeMealFromSchedule={removeMealFromSchedule}
              />
            )}
          />
          <div className="trashCanContainer">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="noBorderTrashCan"
              type="submit"
              onClick={() => clearScheduleAlertUser(schedule)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
            {isHovered ? (
              <div className="clearScheduleToolTip">
                <span className="copyButtonSpan">Clear Meal Schedule</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSchedulePage;
