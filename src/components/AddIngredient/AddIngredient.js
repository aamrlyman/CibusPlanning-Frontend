import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { URL_HOST } from "../../urlHost";
import { useRef } from "react";

let initialValues = {
  name: "",
  unit: "",
  quantity: 0,
  meal_id: null,
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
  // https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering/54159564#54159564
};

const AddIngredient = ({
  fetchIngredients,
  isAddIngredient,
  setIsAddIngredient,
}) => {
  const { mealId } = useParams();
  const [inputRef, setInputFocus] = useFocus();
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [isNameAlertHidden, setIsNameAlertHidden] = useState(true);
  const [isQuantityAlertHidden, setIsQuantityAlertHidden] = useState(true);
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postIngredient
  );

  formData.meal_id = mealId;

  const checkCharacterLengths = () => {
    if (formData.name.length === 30) {
      setIsNameAlertHidden(false);
    } else {
      setIsNameAlertHidden(true);
    }
    if (formData.unit.length === 30) {
      setIsQuantityAlertHidden(false);
    } else {
      setIsQuantityAlertHidden(true);
    }
  };
  useEffect(() => {
    checkCharacterLengths();
  }, [formData.unit, formData.name]);

  async function postIngredient() {
    try {
      let response = await axios.post(
        `${URL_HOST}/api/ingredients/meal_id/${mealId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      reset();
      setInputFocus();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="addIngredientForm">
        <table>
          <tbody>
            <tr className="editIngredientTr">
              <td>
                <button
                  className="cancleEditIngredientButton"
                  type="button"
                  onClick={() => setIsAddIngredient(!isAddIngredient)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </td>
              <td className="ingredientInputTd">
                <label>
                  <input
                    className="ingredientUnitInput"
                    ref={inputRef}
                    autoFocus
                    placeholder="Quantity"
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    maxLength="30"
                  ></input>
                  {isQuantityAlertHidden ? (
                    ""
                  ) : (
                    <p className="AlertP" style={{ textAlign: "center" }}>
                      Too many characters
                    </p>
                  )}
                </label>
              </td>
              <td className="ingredientNameTd">
                <label>
                  <input
                    className="ingredientNameInput"
                    type="text"
                    placeholder=" Ingredient Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength="30"
                  ></input>
                  {isNameAlertHidden ? (
                    ""
                  ) : (
                    <p className="AlertP" style={{ textAlign: "center" }}>
                      Too many characters
                    </p>
                  )}
                </label>
              </td>
              <td>
                <button className="saveIngredientButton" type="submit">
                  <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddIngredient;
