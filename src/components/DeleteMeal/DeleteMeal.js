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

  function confirmDeleteMessage() {
    let isDelete = window.confirm(
      `Are you sure you want to delete your ${meal.name} meal? This action cannot be undone.`
    );
      return isDelete
  }

  async function deleteMeal() {
    try {
      let response = await axios.delete(`${URL_HOST}/api/meals/${meal.id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      afterDelete();
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 409"){
        alert("You can't delete a meal that is being used on a schedule");
      }
    }
  }

  function alertUserDeleteMeal() {
    if (confirmDeleteMessage()) {
      deleteMeal();
    }
  }

  return (
    <div className="deleteButtonContainer">
      <button
        className="noBorderLessPaddingBtn"
        type="button"
        onClick={() => alertUserDeleteMeal(afterDelete)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default DeleteUserMeal;
