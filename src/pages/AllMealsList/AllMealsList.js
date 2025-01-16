import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayMealsList from "../../components/MealRow/DisplayMealsList";
import { useOutletContext } from "react-router-dom";
import "./AllMealsList.css";
import { URL_HOST } from "../../urlHost";
import MealsSearchBar from "../../components/MealsSearchBar/MealsSearchBar";
import { sortMealsAlphabetically } from "../../utils/customfunctions";
import GenericTable from "../../components/GenericTable/GenericTable";
import MealRow from "../../components/MealRow/MealRow";

const AllMealsList = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);
  const fetchMeals = async () => {
    try {
      let response = await axios.get(`${URL_HOST}/api/meals/`);
      const sortedMeals = response.data.sort(sortMealsAlphabetically);
      setMeals(sortedMeals);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const headers = ["Scheduled", "Meal", "Recipe", "Time", "Add"];
  return (
    <div className="tableContainer">
      <MealsSearchBar
        meals={meals}
        fetchMeals={fetchMeals}
        setMeals={setMeals}
      ></MealsSearchBar>
      <GenericTable
        headers={headers}
        data={meals}
        renderRow={(meal, index) => (
          <DisplayMealsList
            scheduleId={schedule?.id}
            meal={meal}
            getScheduledMeals={getScheduledMeals}
            scheduledMeals={scheduledMeals}
            removeMealFromSchedule={removeMealFromSchedule}
          />
        )}
      />
    </div>
  );
};

export default AllMealsList;
