import "./EmptySchedule.css"
import { Link } from "react-router-dom";

const EmptySchedule = () => {
  return (
    <div className="homePageFillerDiv">
      <p className="firstLineP">Looks like you haven't planned any meals!</p>
      <p className="secondLineP">
        Go to <Link to="/mealsList">All Meals</Link> and click the{" "}
        <span style={{ color: "#7c262b" }}>
          <Link to="/mealsList">
            <i className="fa-solid fa-circle-plus"></i>
          </Link>
        </span>{" "}
        to add some preset meals to your meal plan, Or Click on the{" "}
        <Link style={{ fontSize: "1.75rem" }} to="/createMeal">
          +
        </Link>{" "}
        to create and add some of your own.
      </p>
      <div className="iFrameContainer">
        <iframe
          className="responsive-iframe"
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/l72tS9B6L8I?autoplay=1&origin=http://example.com`}
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default EmptySchedule;
