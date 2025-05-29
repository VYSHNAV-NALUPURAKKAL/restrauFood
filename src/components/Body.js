import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  console.log("body rednerd");
  useEffect(() => {
    apiFetchData();
  }, []);

  const apiFetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.2587531&lng=75.78041&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setData(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return data.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
          ></input>
          <button
            className="searchBtn"
            onClick={() => {
              const filteredSearchData = data
                .toLowerCase()
                .includes(searchData.toLowerCase());
            }}
          >
            Search
          </button>
        </div>
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
