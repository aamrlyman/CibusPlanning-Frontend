import "./DisplayTimes.css";

const DisplayTimes = ({meal}) => {
    return (
        <div className="displayTimes">
        <p className="displaytimeP">
        <span className="pTitle">Prep</span>:{" "}
        {meal.prep_time_hours === 0
          ? " "
          : meal.prep_time_hours + "h"}{" "}
        {meal.prep_time_minutes === 0
          ? " "
          : meal.prep_time_minutes + "m"}
          <br/>
          <span className="pTitle">Cook</span>:{" "}
        {meal.cook_time_hours === 0
          ? " "
          : meal.cook_time_hours + "h"}{" "}
        {meal.cook_time_minutes === 0
          ? " "
          : meal.cook_time_minutes + "m"}
      </p>
        </div>
      );
}
 
export default DisplayTimes;

