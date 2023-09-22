import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";
import { URL_HOST } from "../../urlHost";

const EditIngredients = ({
  ingredient,
  fetchIngredients,
  handleCancelClick,
  setEditIngredientId,
}) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [isNameAlertHidden, setIsNameAlertHidden] = useState(true);
  const [isQuantityAlertHidden, setIsQuantityAlertHidden] = useState(true);
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    ingredient,
    editIngredients
  );

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

  formData.meal_id = mealId;

  async function editIngredients() {
    try {
      let response = await axios.put(
        `${URL_HOST}/api/ingredients/${ingredient.id}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      setEditIngredientId(null);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {ingredient ? (
        <form onSubmit={handleSubmit} className="editIngredientForm">
          <table>
            <tbody>
              <tr className="editIngredientTr">
                <td>
                  <button
                    className="cancleEditIngredientButton"
                    type="button"
                    onClick={() => handleCancelClick()}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </td>
                <td className="unitTd">
                  <input
                    className="ingredientUnitInput"
                    autoFocus
                    type="text"
                    name="unit"
                    placeholder="Quantity"
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
                </td>
                <td>
                  <input
                    className="ingredientNameInput"
                    type="text"
                    name="name"
                    placeholder=" Ingredient Name"
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
      ) : (
        ""
      )}
    </div>
  );
};

export default EditIngredients;
