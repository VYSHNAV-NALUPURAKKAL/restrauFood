import React from "react";

const FoodLoader = () => {
  return (
    <div className="food-loader-wrapper">
      <div className="food-loader">
        <div className="plate"></div>
        <div className="burger"></div>
      </div>
      <p>Loading more delicious food...</p>
    </div>
  );
};

export default FoodLoader;
