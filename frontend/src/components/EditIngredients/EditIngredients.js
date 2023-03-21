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
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    ingredient,
    editIngredients
  );

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
      alert("For fraction quantities, put in 0 for quantity and use the free text unit box. Example: '1/2 cup'")
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
                <td>
                  <input
                    className="ingredientNameInput"
                    type="text"
                    name="name"
                    placeholder=" Ingredient Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <input
                    className="ingredientQuantityInput"
                    type="number"
                    name="quantity"
                    value={
                      formData.quantity > 0
                        ? formData.quantity
                        : (formData.quantity = 0)
                    }
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td className="unitTd">
                  <input
                    className="ingredientUnitInput"
                    type="text"
                    name="unit"
                    placeholder="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  ></input>
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
