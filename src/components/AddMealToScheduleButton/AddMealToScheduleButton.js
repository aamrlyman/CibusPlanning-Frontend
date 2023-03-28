import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost";

const AddMealToScheduleButton = ({ scheduleId, meal, getScheduledMeals }) => {
  const [user, token] = useAuth();

  const addMealToSchedule = async (scheduleId, meal) => {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/schedules/${scheduleId}/`,
        {
          meal_id: meal.id,
          schedule_id: scheduleId,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getScheduledMeals(scheduleId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      className="noBorder"
      onClick={(event) => addMealToSchedule(scheduleId, meal)}
    >
    <i className="fa-solid fa-circle-plus"></i>
    </button>
  );
};

export default AddMealToScheduleButton;
