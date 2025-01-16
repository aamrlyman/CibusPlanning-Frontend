import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import { Link } from "react-router-dom";
import DeleteUserMeal from "../DeleteMeal/DeleteMeal";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

interface MealRowBaseProps {
  index: number;
  href: string;
  scheduleId: string | undefined;
  meal: any;
  getScheduledMeals: () => void;
  scheduledMeals: any[];
  fetchMeals: () => void;
  removeMealFromSchedule: (id: number) => void;
  isDelete?: boolean; // Optional prop to handle conditional behavior
}

const MealRow: React.FC<MealRowBaseProps> = ({
  scheduleId,
  href: mealUrl,
  meal,
  getScheduledMeals,
  scheduledMeals,
  fetchMeals,
  removeMealFromSchedule,
  isDelete,
  index,
}) => {
  return (
    <tr key={index}>
      <td className="userMealsTd">
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </td>
      <td className="userMealsTd">
        <Link
          to={meal && `/${mealUrl}/${meal.id}/`}
        >
          {" "}
          {meal.name}
        </Link>
      </td>
      <td className="userMealsTd">
        {meal.url ? (
          <a href={meal.url}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        ) : (
          <a className="noLink">No Link Available</a>
        )}
      </td>
      <td className="times">{meal ? <DisplayTimes meal={meal} /> : ""}</td>
      <td className="addRemoveTd">
        <div className="addRemoveContainer">
          <span>
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
                meal={meal}
                getScheduledMeals={getScheduledMeals}
              />
            )}
          </span>
          <span>
            {isDelete && meal && (
              <DeleteUserMeal meal={meal} afterDelete={fetchMeals} />
            )}
          </span>
        </div>
      </td>
    </tr>
  );
};
export default MealRow;
