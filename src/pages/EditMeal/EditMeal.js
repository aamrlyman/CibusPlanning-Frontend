import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { URL_HOST } from "../../urlHost";
import "./EditMeal.css";

const EditMeal = ({ setIsEdit, meal, fetchMeal }) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { mealId } = useParams();
  const [isNameAlertHidden, setIsNameAlertHidden] = useState(true);
  const [isNotesAlertHidden, setIsNotesAlertHidden] = useState(true);
  const [isURLAlertHidden, setIsURLAlertHidden] = useState(true);
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    meal,
    editMealValidateInput
  );

  const checkCharacterLengths = () => {
    if (formData.name.length === 60) {
      setIsNameAlertHidden(false);
    } else {
      setIsNameAlertHidden(true);
    }
    if (formData.notes.length === 1000) {
      setIsNotesAlertHidden(false);
    } else {
      setIsNotesAlertHidden(true);
    }
    if (formData.url.length === 150) {
      setIsURLAlertHidden(false);
    } else {
      setIsURLAlertHidden(true);
    }
  };

  useEffect(() => {
    checkCharacterLengths();
  }, [formData.url, formData.name, formData.notes]);

  async function editMeal() {
    try {
      let response = await axios.put(
        `${URL_HOST}/api/meals/${mealId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      fetchMeal();
      setIsEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  function validatePrepCookTimeInput() {
    for (const key in formData) {
      if (!formData[key] || formData[key] < 0) {
        if(key === "name" || key === "notes" || key === "url" ){formData[key] = ""}
        else{
          formData[key] = 0;
        }
      }
    }
  }

  function editMealValidateInput() {
    validatePrepCookTimeInput();
    editMeal();
  }

  return (
    <form onSubmit={handleSubmit} className="editMealForm">
      <div className="mealNameTimesButtonsContainer">
        <div className="editMealNameContainer">
          <label>
            <input
              className="editMealInput"
              placeholder="Meal Name"
              type="text"
              name="name"
              value={formData.name}
              maxLength="60"
              onChange={handleInputChange}
            ></input>
            {isNameAlertHidden ? (
              ""
            ) : (
              <p className="AlertP" style={{ textAlign: "center" }}>
                Meal Name has reached max character length (60).
              </p>
            )}
          </label>
        </div>
        <div className="editTimesContainer">
          <label>
            <span className="pTitle">
              Prep: <span style={{ color: "#e6c593" }}>|</span>
            </span>
            <input
              type="number"
              name="prep_time_hours"
              value={formData.prep_time_hours}
              onChange={handleInputChange}
            ></input>
            <label>h </label>
            <input
              type="number"
              name="prep_time_minutes"
              value={formData.prep_time_minutes}
              onChange={handleInputChange}
            ></input>
            <label>m</label>
          </label>
          <br />
          <label>
            <span className="pTitle">Cook: </span>
            <input
              type="number"
              name="cook_time_hours"
              value={formData.cook_time_hours}
              onChange={handleInputChange}
            ></input>
            <label>h </label>
            <input
              type="number"
              name="cook_time_minutes"
              value={formData.cook_time_minutes}
              onChange={handleInputChange}
            ></input>
            <label>m</label>
          </label>
        </div>
        <div className="saveCancleButtonContainer">
          <div className="cancelButtonContainer">
            <button
              className="cancleSaveButtons"
              type="button"
              onClick={() => navigate("/userMealsList")}
            >
              <i className="fa-regular fa-rectangle-xmark"></i>
            </button>
          </div>
          <div className="saveButtonContainer">
            <button className="cancleSaveButtons" type="submit">
              <i className="fa-regular fa-floppy-disk"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="editNotesURLContainer">
        <div className="editMealNotes">
          <label>
            {isNotesAlertHidden ? (
              <h3>Notes:</h3>
            ) : (
              <p className="AlertP">
                Meal Notes has reached max character length (1000).
              </p>
            )}
          </label>
          <textarea
            style={{ width: "288px", height: "25vh" }}
            placeholder="Example: This recipe takes a lot longer to make than you think it will, but its worth it."
            type="text"
            name="notes"
            value={formData.notes}
            maxLength="1000"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="editURLContainer">
          <label className="editLinkLabel">
            <input
              className="editLinkInput"
              placeholder="https://www.allrecipes.com/recipe/8532956/dump-and-go-instant-pot-tortilla-soup/"
              type="text"
              name="url"
              value={formData.url}
              maxLength="150"
              onChange={handleInputChange}
            ></input>
            {isURLAlertHidden ? (
              ""
            ) : (
              <p className="AlertP" style={{ marginLeft: "1.8vw" }}>
                Meal URL has reached max character length (150).
              </p>
            )}
          </label>
        </div>
      </div>
    </form>
  );
};

export default EditMeal;
