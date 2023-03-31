import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./GroceryList.css";
import { URL_HOST } from "../../urlHost";

const GroceryList = () => {
  const [schedule, getUserSchedule] = useOutletContext();
  const [user, token] = useAuth();
  const [groceryList, setGroceryList] = useState();
  const [sortType, setSortType] = useState("ingredientsOnly");
  const [addDashes, setAddDashes] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function eliminateDuplicates(arr) {
    let namesOnly = arr.map((el) => el.name.toLowerCase());
    let result = namesOnly
      .filter((name, index) => namesOnly.indexOf(name) === index)
      .sort();
    return result;
  }

  function buildObjects(name, array) {
    let obj = {
      name: "",
      meals: [
        {
          name: "",
          id: null,
          unit: "",
          quantity: null,
        },
      ],
    };
    for (const index in array) {
      if (array[index].name.toLowerCase() === name) {
        obj.name = name;
        obj.meals.push({
          name: array[index].meal.name,
          id: array[index].meal.id,
          unit: array[index].unit,
          quantity: array[index].quantity,
        });
      }
    }
    obj.meals.shift();
    return obj;
  }

  function sortedGroceryList(array) {
    let namesOnly = eliminateDuplicates(array);
    let finalList = [];
    for (const index in namesOnly) {
      finalList.push(buildObjects(namesOnly[index], array));
    }
    return finalList;
  }

  const fetchGroceries = async (scheduleId) => {
    try {
      let response = await axios.get(
        `${URL_HOST}/api/ingredients/grocery_list/${scheduleId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setGroceryList(sortedGroceryList(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (schedule) {
      fetchGroceries(schedule.id);
    }
  }, [schedule]);

  function copiedGroceries(array, sortType) {
    let copiedList = "";
    switch (sortType) {
      case "ingredientsOnly":
        copiedList = "Ingredients";
        for (const index in array) {
          copiedList += `\n${array[index].name}`;
        }
        return copiedList;

      case "+MealCount":
        copiedList = "Ingredients, # of Meals";
        for (const index in array) {
          copiedList += `\n${array[index].name}, ${array[index].meals.length}`;
        }
        return copiedList;

      case "+MealNames":
        copiedList = "Ingredients, (Meals)";
        let meals = "";
        for (const index in array) {
          copiedList += `\n${array[index].name} (`;
          for (const i in array[index].meals) {
            if (i == !(array[index].meals.length - 1)) {
              meals += ` ${array[index].meals[i].name},`;
            } else meals += ` ${array[index].meals[i].name}`;
          }
          copiedList += `${meals})`;
          meals = "";
        }
        return copiedList;

      case "+quantities":
        copiedList = "Ingredients, (Quantities)";
        let quantities = "";
        let comma = "";
        for (const index in array) {
          copiedList += `\n${array[index].name} (`;
          for (const i in array[index].meals) {
            i == !(array[index].meals.length - 1)
              ? (comma = ",")
              : (comma = "");
            quantities += `${
              array[index].meals[i].quantity === 0
                ? ""
                : array[index].meals[i].quantity
            } ${array[index].meals[i].unit}${comma}`;
          }
          copiedList += `${quantities})`;
          quantities = "";
        }
        return copiedList;

      case "everything":
        copiedList = "Ingredients |  Meals  |  Quantities";
        let everything = "";
        let commaString = "";
        for (const index in array) {
          copiedList += `\n${array[index].name} (`;
          for (const i in array[index].meals) {
            i == !(array[index].meals.length - 1)
              ? (commaString = ",")
              : (commaString = "");
            everything += ` ${array[index].meals[i].name}: ${
              array[index].meals[i].quantity === 0
                ? ""
                : array[index].meals[i].quantity
            } ${
              array[index].meals[i].unit === 0 ? "" : array[index].meals[i].unit
            }${commaString}`;
          }
          copiedList += `${everything})`;
          everything = "";
        }
        return copiedList;
    }
  }

  return (
    <div className="groceryListContainer">
      <ul className="sortOptions">
        <li>
          {sortType === "ingredientsOnly" ? (
            <Link to="/groceries">
              <button
                style={{ color: "#f0e1b2", backgroundColor: "#7c262b" }}
                type="button"
                onClick={() => setSortType("ingredientsOnly")}
              >
                Ingredients
              </button>
            </Link>
          ) : (
            <Link to="/groceries">
              <button
                type="button"
                onClick={() => setSortType("ingredientsOnly")}
              >
                Ingredients
              </button>
            </Link>
          )}
        </li>
        <li>
          {sortType === "+MealNames" ? (
            <Link to="+MealNames">
              <button
                style={{ color: "#f0e1b2", backgroundColor: "#7c262b" }}
                type="button"
                onClick={() => setSortType("+MealNames")}
              >
                +Meals
              </button>
            </Link>
          ) : (
            <Link to="+MealNames">
              <button type="button" onClick={() => setSortType("+MealNames")}>
                +Meals
              </button>
            </Link>
          )}
        </li>
        <li>
          {sortType === "+MealCount" ? (
            <Link to="+MealCount">
              <button
                style={{ color: "#f0e1b2", backgroundColor: "#7c262b" }}
                type="button"
                onClick={() => setSortType("+MealCount")}
              >
                # of Meals
              </button>
            </Link>
          ) : (
            <Link to="+MealCount">
              <button type="button" onClick={() => setSortType("+MealCount")}>
                # of Meals
              </button>
            </Link>
          )}
        </li>
        <li>
          {sortType === "+quantities" ? (
            <Link to="+quantities">
              <button
                style={{ color: "#f0e1b2", backgroundColor: "#7c262b" }}
                type="button"
                onClick={() => setSortType("+quantities")}
              >
                Quantities
              </button>
            </Link>
          ) : (
            <Link to="+quantities">
              <button type="button" onClick={() => setSortType("+quantities")}>
                Quantities
              </button>
            </Link>
          )}
        </li>
        <li>
          {sortType === "everything" ? (
            <Link to="everything">
              <button
                style={{ color: "#f0e1b2", backgroundColor: "#7c262b" }}
                type="button"
                onClick={() => setSortType("everything")}
              >
                Everything
              </button>
            </Link>
          ) : (
            <Link to="everything">
              <button type="button" onClick={() => setSortType("everything")}>
                Everything
              </button>
            </Link>
          )}
        </li>
        <li>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="copyButton"
            onClick={() => {
              let list = copiedGroceries(groceryList, sortType);
              navigator.clipboard.writeText(list);
              alert(`List Copied to Clipboard!\n${list}`);
            }}
          >
            <i className="fa-regular fa-clone"></i>{" "}
          </button>
          {isHovered ? (
            <div className="toolTip">
              <span className="copyButtonSpan">
                Copy grocery list to clipboard.
              </span>
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
      {!groceryList || groceryList.length < 1 ? (
        <div className="homePageFillerDiv">
          <p className="firstLineP">You grocery list is empty <i className="fa-solid fa-cart-shopping"></i></p>
          <p className="secondLineP">
            Go to <Link to="/mealsList">All Meals</Link> and click the{" "}
            <span style={{ color: "#7c262b" }}>
            <Link to="/mealsList"><i className="fa-solid fa-circle-plus"></i></Link>
            </span>{" "}
            to add pre-made meals to your meal plan, Or Click on the{" "}
            <Link style={{ fontSize: "1.75rem" }} to="/createMeal">
              +
            </Link>{" "}
            to create and add some of your own.
          </p>
        </div>):
      <Outlet context={[groceryList, sortType]} /> }
    </div>
  );
};

export default GroceryList;
