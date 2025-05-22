import RestaurantCard from "./RestaurantCard";
import restaurantData from "../utils/mockData";
import { useState } from "react";

const Body = () => {

    const [data,setData]=useState(restaurantData)
  return (
    <div className="body">
      <div className="filter">
            <button className="filter-btn" onClick={()=>{
              const filteredData = data.filter((value)=> value.rating>=4)
              setData(filteredData)
            }}>4 Star Restaurants</button>
      </div>
      <div className="res-container">
        {data.map((value) => {
          return <RestaurantCard key={value.id} resData={value} />;
        })}
      </div>
    </div>
  );
};

export default Body;
