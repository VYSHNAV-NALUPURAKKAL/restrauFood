import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [btnClr, setBtnClr] = useState("lightgreen");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
          <li>Cart</li>
          <button
            style={{
              backgroundColor: btnClr,
            }}
            className="login"
            onClick={() => {
              btnName === "Login"
                ? (setBtnName("Logout"), setBtnClr("red"))
                : (setBtnClr("lightgreen"), setBtnName("Login"));
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
