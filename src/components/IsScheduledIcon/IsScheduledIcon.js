
const IsScheduledIcon = ({scheduledMeals, meal}) => {
    return (
        <div className="icon">

            { meal && scheduledMeals && scheduledMeals.some((sMeal) => sMeal.meal.id == meal.id)? 
              <i className="fa-regular fa-square-check"></i>
              :
              <i className="fa-regular fa-square"></i>
            } 
        </div>     
      );
}
 
export default IsScheduledIcon;