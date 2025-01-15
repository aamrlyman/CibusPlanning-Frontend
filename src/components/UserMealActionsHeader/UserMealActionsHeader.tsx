import React from 'react';
import { Link } from 'react-router-dom';

const UserMealActionsHeader = ({ setIsDelete, isDelete }: { setIsDelete: (value: boolean) => void; isDelete: boolean }) => {
    return (
        <div>
      <Link className="tableAddMealLink" to="/createMeal">
        +
      </Link>
      <span className="editMeals">
                  <button
                    className="noBorder"
                    type="button"
                    onClick={() => setIsDelete(!isDelete)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </span>
    </div>
      );
}
 
export default UserMealActionsHeader ;