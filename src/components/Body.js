import RestaurantCard from "./RestaurantCard";
import { useEffect, useState, useRef } from "react";
import Shimmer from "./Shimmer";
import Loader from "./Loader";

const Body = () => {
  const [data, setData] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight + 1 >= totalHeight) {
        setData((prev) => prev + 16);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagination]);

  const apiFetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.2587531&lng=75.78041&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setData(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredSearch(
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
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="searchBtn"
            onClick={() => {
              const filteredSearchData = data.filter((val) => {
                return val.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredSearch(filteredSearchData);
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
            setFilteredSearch(filteredData);
          }}
        >
          4 Star Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredSearch.map((value) => {
          return <RestaurantCard key={value.info.id} resData={value.info} />;
        })}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Body;
