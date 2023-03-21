import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { URL_HOST } from "../../urlHost";
import axios from "axios";

const CibusPlanning = (props) => {
  const [schedule, setSchedule] = useState();
  const [scheduledMeals, setScheduledMeals] = useState();
  const [user, token] = useAuth();
  const getUserSchedule = async () => {
    try {
      let response = await axios.get(`${URL_HOST}/api/schedules/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSchedule(response.data[0]);
      getScheduledMeals(response.data[0] && response.data[0].id);
      if (response.data.length < 1) {
        createUserSchedule();
        getUserSchedule();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserSchedule();
  }, [token]);
  

  const createUserSchedule = async () => {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/schedules/`,
        { user_id: user.id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getScheduledMeals = async (scheduleId) => {
    try {
      let response = await axios.get(
        `${URL_HOST}/api/schedules/${scheduleId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setScheduledMeals(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeMealFromSchedule = async (
    scheduledMealId,
    scheduleId,
    afterDelete
  ) => {
    try {
      let response = await axios.delete(
        `${URL_HOST}/api/schedules/scheduled_meal/${scheduledMealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setScheduledMeals(scheduledMeals.filter((sMeal)=> sMeal.id !== scheduledMealId));
      afterDelete(scheduleId);
      // getScheduledMeals(scheduleId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearSchedule = async (schedule) => {
    if (
      !window.confirm(
        "Are you sure you want to clear this schedule? This action cannot be undone."
      )
    ) {
      return null;
    }
    try {
        let response = await axios.delete(
          `${URL_HOST}/api/schedules/${schedule.id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // getScheduledMeals(schedule);
        setScheduledMeals(null)
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <div className="container">
      <Outlet
        context={[
          schedule,
          scheduledMeals,
          getScheduledMeals,
          removeMealFromSchedule,
          clearSchedule,
          getUserSchedule
        ]}
      />
    </div>
  );
};



export default CibusPlanning;

/* {cars &&
cars.map((car) => (
  <p key={car.id}>
    {car.year} {car.model} {car.make}
  </p>
))} */
