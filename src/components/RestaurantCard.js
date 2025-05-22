import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {resData} = props


  return (
    <div className="res-card">
      <img className="res-image" alt="Restaurant logo" src={CDN_URL(resData.imageId)} />

      <h3 className="res-name">{resData.name}</h3>
      <h5 className="res-cuisine">{resData.cuisines}</h5>
      <div className="restaurant-rating">
        <span className="rating-star">{resData.rating}</span>
      </div>

      <div className="delivery-time">{resData.deliveryTime}</div>
    </div>
  );
};

export default RestaurantCard;
