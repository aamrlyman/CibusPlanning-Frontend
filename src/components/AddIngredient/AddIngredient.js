import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { URL_HOST } from "../../urlHost";
import {useRef} from "react";

let initialValues = {
  name: "",
  unit: "",
  quantity: 0,
  meal_id: null,
};

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
  return [ htmlElRef, setFocus ] 
  // https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering/54159564#54159564
}

const AddIngredient = ({
  fetchIngredients,
  isAddIngredient,
  setIsAddIngredient,
}) => {
  const { mealId } = useParams();
  const [inputRef, setInputFocus] = useFocus();
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postIngredient
  );
  formData.meal_id = mealId;


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
      alert("For fraction quantities, put in 0 for quantity and use the free text unit box. Example: '1/2 cup'")
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
              <td className="ingredientNameTd">
                <label>
                  <input
                    ref={inputRef}
                    className="ingredientNameInput"
                    type="text"
                    placeholder=" Ingredient Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoFocus
                  ></input>
                </label>
              </td>
              {/* <td>
                <label>
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
                </label>
              </td> */}
              <td className="ingredientInputTd">
                <label>
                  <input
                    className="ingredientUnitInput"
                    placeholder="Quantity"
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  ></input>
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
