import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { URL_HOST } from "../../urlHost";
import DuplicateIngredientButton from "../DuplicateIngredient/DuplicateIngredientButton";

const DisplayIngredients = ({
  ingredient,
  fetchIngredients,
  handleEditClick,
}) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();

  const deleteIngredient = async (ingredient) => {
    try {
      let response = await axios.delete(
        `${URL_HOST}/api/ingredients/${ingredient.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      {ingredient ? (
        <table>
          <tbody>
            <tr className="ingredientLi" key={ingredient.id}>
              <td>
                <button
                  className="editIngredientButton"
                  onClick={() => handleEditClick(ingredient)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </td>
              <td className="ingredientInfoTd">
                {ingredient.quantity === 0 ? "" : ingredient.quantity}{" "}
                {ingredient.unit === "" ? "" : ingredient.unit}{" "}
                {ingredient.name}
              </td>
              <td>
                <DuplicateIngredientButton
                  fetchIngredients={fetchIngredients}
                  ingredient={ingredient}
                />
              </td>
              <td>
                <button
                  className="deleteIngredientButton"
                  type="button"
                  onClick={() => deleteIngredient(ingredient)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default DisplayIngredients;
