import RestaurantCard from "./RestaurantCard";
import restaurantData from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    apiFetchData();
  }, []);

  const apiFetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.2587531&lng=75.78041&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      "ullil",
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setData(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredData = data.filter(
              (value) => value.info.avgRating >= 4.3
            );
            setData(filteredData);
          }}
        >
          4 Star Restaurants
        </button>
      </div>
      <div className="res-container">
        {data.map((value) => {
          return <RestaurantCard key={value.info.id} resData={value.info} />;
        })}
      </div>
    </div>
  );
};

export default Body;
