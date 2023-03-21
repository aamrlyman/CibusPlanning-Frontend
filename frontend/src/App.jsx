// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import React, { useState, useEffect } from "react";

// Pages Imports
import CibusPlanningPage from "./pages/CibusPlanningPage/CibusPlanningPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MealSchedulePage from "./pages/MealSchedulePage/MealSchedulePage";
import AllMealsList from "./pages/AllMealsList/AllMealsList";
import DisplayMeal from "./pages/DisplayMeal/DisplayMeal";
import CreateMeal from "./pages/CreateMeal/CreateMeal";
import UserMealsList from "./pages/UserMealsList/UserMealsList";
import UserMeal from "./pages/UserMeal/UserMeal";
import GroceryList from "./pages/GroceryList/GroceryList";
import NotFound from "./pages/NotFound/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import IngredientsOnly from "./pages/GroceryList/IngredientsOnly";
import MealCount from "./pages/GroceryList/MealCount";
import Quantities from "./pages/GroceryList/Quantities";
import MealNames from "./pages/GroceryList/MealNames";
import Everything from "./pages/GroceryList/Everything";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
// import useAuth from "./hooks/useAuth";
// import ScheduleIdProvider from "./context/scheduleIdContext";
// import Ingredients from "./components/Ingredients/Ingredients";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CibusPlanningPage />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MealSchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mealsList"
            element={
              <PrivateRoute>
                <AllMealsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/meal/:mealId"
            element={
              <PrivateRoute>
                <DisplayMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/createMeal"
            element={
              <PrivateRoute>
                <CreateMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="userMealsList/"
            element={
              <PrivateRoute>
                <UserMealsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/userMeal/:mealId"
            element={
              <PrivateRoute>
                <UserMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/groceries"
            element={
              <PrivateRoute>
                <GroceryList />
              </PrivateRoute>
            }
          >
            <Route
              path="/groceries"
              element={
                <PrivateRoute>
                  <IngredientsOnly />
                </PrivateRoute>
              }
            />
            <Route
              path="+MealCount"
              element={
                <PrivateRoute>
                  <MealCount />
                </PrivateRoute>
              }
            />
            <Route
              path="+MealNames"
              element={
                <PrivateRoute>
                  <MealNames />
                </PrivateRoute>
              }
            />
            <Route
              path="+quantities"
              element={
                <PrivateRoute>
                  <Quantities />
                </PrivateRoute>
              }
            />
            <Route
              path="everything"
              element={
                <PrivateRoute>
                  <Everything />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        {/* <Route path="landingPage" element={<LandingPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// managing state https://www.youtube.com/watch?v=FzlurzsCW4M
