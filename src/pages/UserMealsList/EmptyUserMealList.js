import { Link } from "react-router-dom";

const EmptyUserMealList = () => {
  return (
    <div className="homePageFillerDiv">
      <p className="firstLineP">You don't have any custom meals!</p>
      <p className="secondLineP">
        Click the{" "}
        <Link style={{ fontSize: "1.75rem" }} to="/createMeal">
          +
        </Link>{" "}
        to create custom meals of your own.{" "}
      </p>
      <br />
      <p className="thirdlineP">
        Edit or delete your meals by clicking the{" "}
        <span style={{ color: "#7c262b" }}>
          <i className="fa-solid fa-pencil"></i>
        </span>{" "}
        or the <Link to="">meal name</Link>.
      </p>
    </div>
  );
};

export default EmptyUserMealList;
