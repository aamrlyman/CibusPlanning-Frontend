import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "./UserMealsList.css";
import { URL_HOST } from "../../urlHost";
import EmptyUserMealList from "./EmptyUserMealList";
import { sortMealsAlphabetically } from "../../utils/customfunctions";
import MealsSearchBar from "../../components/MealsSearchBar/MealsSearchBar";
import GenericTable from "../../components/GenericTable/GenericTable";
import useAuth from "../../hooks/useAuth";
import MealRow from "../../components/MealRow/MealRow";
import UserMealActionsHeader from "../../components/UserMealActionsHeader/UserMealActionsHeader";

export interface Meal {
  id: number;
  name: string;
  recipe: string;
  time: string;
}

const UserMealsList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [_,token] = useAuth();
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] = useOutletContext<[Record<string,number>, Meal[], () => void, (mealId: number) => void]>();

  const fetchMeals = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<Meal[]>(`${URL_HOST}/api/meals/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const alphabeticallySortedMeals = response.data.sort(sortMealsAlphabetically);
      setMeals(alphabeticallySortedMeals);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  }, [token]);
  
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]); 
  

const headers = [
    "Scheduled",
    "Meal",
    "Recipe",
    "Time",
    <UserMealActionsHeader setIsDelete={setIsDelete} isDelete={isDelete} />,
  ];

  return (
    <div className="tableContainer">
      <MealsSearchBar meals={meals} setMeals={setMeals} fetchMeals={fetchMeals} />
      {meals.length === 0 ? (
        <EmptyUserMealList />
      ) : (
        <GenericTable
          headers={headers}
          data={meals}
          renderRow={ (meal, index)=> 
            <MealRow 
            index={index}
            scheduleId = {schedule?.id}
            meal={meal}
            getScheduledMeals={getScheduledMeals}
            scheduledMeals={scheduledMeals}
            fetchMeals = {fetchMeals}
            removeMealFromSchedule={removeMealFromSchedule}
            isDelete={isDelete}
            />
          }
        />
      )}
    </div>
  );
};

export default UserMealsList;
