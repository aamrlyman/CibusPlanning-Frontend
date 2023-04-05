import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL_HOST } from "../../urlHost";

const DeleteUserMeal = ({ meal, afterDelete }) => {
  const [user, token] = useAuth();
  //   const { mealId } = useParams();
  const navigate = useNavigate();

  const deleteMeal = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this meal? This action cannot be undone."
      )
    ) {
      return null;
    }
    try {
      let response = await axios.delete(
        `${URL_HOST}/api/meals/${meal.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      afterDelete();
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 409")
        alert("You can't delete a meal that is being used on a schedule");
    }
  };

  return (
    <div className="deleteButtonContainer">
      <button className="noBorderLessPaddingBtn" type="button" onClick={() => deleteMeal(afterDelete)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default DeleteUserMeal;
