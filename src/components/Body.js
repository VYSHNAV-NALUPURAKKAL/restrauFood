import RestaurantCard from "./RestaurantCard";
import { useEffect, useState, useRef } from "react";
import Shimmer from "./Shimmer";
import Loader from "./Loader";

const Body = () => {
  const [data, setData] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    nextOffSet: null,
    widgetOffSet: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      console.log(
        "total height ;",
        totalHeight,
        "scrollTop :",
        scrollTop,
        "windoeWHieght :",
        windowHeight
      );
      if (scrollTop + windowHeight >= totalHeight - 300) {
        updateFetch();
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
    const pageOffSet = json?.data?.pageOffset;
    setPagination({
      nextOffSet: pageOffSet?.nextOffset,
      widgetOffSet: pageOffSet?.widgetOffset,
    });
    setData(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredSearch(
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const updateFetch = async () => {
    const payload = {
      lat: 11.2587531,
      lng: 75.78041,
      nextOffset: pagination.nextOffset,
      widgetOffset: pagination.widgetOffset,
      filters: {},
      seoParams: {
        seoUrl: "https://www.swiggy.com/restaurants",
        pageType: "FOOD_HOMEPAGE",
        apiName: "FoodHomePage",
        businessLine: "FOOD",
      },
      page_type: "DESKTOP_WEB_LISTING",
    };

    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    ///CORS ISSUE NOT SOLVED
    const json = await res.json();
    const newResUpdateData =
      json?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    const nextOffset = json?.data?.pageOffset?.nextOffset;
    const widgetOffset = json?.data?.pageOffset?.widgetOffSet;

    setData((prev) => [...prev, ...newResUpdateData]);
    setFilteredSearch((prev) => [...prev, ...newResUpdateData]);
    setPagination({ nextOffset, widgetOffset });
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
