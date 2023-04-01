import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import cibuslogo2 from "../../cibuslogo2.png";
import CibusLogo from "../../CibusLogo.png";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("home");
  const [isHovered, setIsHovered] = useState(false);

  function changeLocation(user, string) {
    if (user) {
      setLocation(string);
    }
  }
  useEffect(() => {
    if (user) {
      setLocation("home");
    } else setLocation(null);
  }, [user]);

  return (
    <div className="navBar">
      <ul className="navLi">
        <li
          className="brand"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <div>
              <Link
                className="navLink"
                to="/"
                onClick={() => changeLocation(user, "home")}
              >
                <img src={CibusLogo} width="70" height="70" />
              </Link>
              {location === "home" && user ? (
                <hr />
              ) : (
                <hr className="homeLinkHr" />
              )}
            </div>
          ) : (
            <div>
              <Link
                className="navLink"
                to="/"
                onClick={() => changeLocation(user, "home")}
              >
                <img src={CibusLogo} width="70" height="70" />
              </Link>
              <hr className="placeholderHr" />

            </div>
          )}
        </li>
        <li>
          {location !== "home" ? (
            <Link
              className="navLink"
              to="/"
              onClick={() => changeLocation(user, "home")}
            >
              Planned Meals
            </Link>
          ) : (
            <Link to="/" className="navLinkActive">
              Planned Meals
              <hr />
            </Link>
          )}
        </li>
        <li>
          {location !== "/mealsList" ? (
            <Link
              className="navLink"
              to="/mealsList"
              onClick={() => changeLocation(user, "/mealsList")}
            >
              All Meals
            </Link>
          ) : (
            <Link to="/mealsList" className="navLinkActive">
              All Meals
              <hr />
            </Link>
          )}
        </li>
        <li>
          {location !== "userMealsList/" ? (
            <Link
              to="userMealsList/"
              className="navLink"
              onClick={() => changeLocation(user, "userMealsList/")}
            >
              Custom Meals
            </Link>
          ) : (
            <Link to="userMealsList/" className="navLinkActive">
              Custom Meals
            </Link>
          )}
          <span className="plusIcon">
            {location !== "/createMeal" ? (
              <Link
                to="/createMeal"
                className="navLink"
                onClick={() => changeLocation(user, "/createMeal")}
              >
                <i className="fa-solid fa-plus"></i>
              </Link>
            ) : (
              <Link to="/createMeal" className="navLinkActive">
                <i className="fa-solid fa-plus-minus"></i>
              </Link>
            )}
          </span>
          {location === "userMealsList/" ? <hr style={{ width: "85%" }} /> : ""}
        </li>

        <li>
          {location !== "/groceries" ? (
            <Link
              className="navLink"
              to="/groceries"
              onClick={() => changeLocation(user, "/groceries")}
            >
              Grocery List
            </Link>
          ) : (
            <Link to="/groceries" className="navLinkActive">
              Grocery List
              <hr />
            </Link>
          )}
        </li>

        <li>
          {user ? (
            <Link to="/login" className="navLink" onClick={logoutUser}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="navLink">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
