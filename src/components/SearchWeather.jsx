import React from "react";
import { useContext, useState } from "react";
import WeatherContext from "./context/WeatherContext";
import classes from "./css/SearchWeather.module.css";
import { FaSearch } from "react-icons/fa";
function SearchWeather() {
  const [text, setText] = useState("");
  const [isBlank, setBlank] = useState(false);
  const { SearchWeather } = useContext(WeatherContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      SearchWeather(text);
    } else {
      setBlank(true);
    }
  };
  const handleChangeCity = (e) => {
    setBlank(false);
    setText(e.target.value);
  };
  return (
    <div className={classes["search-container"]}>
      <h2 className={classes["app-title"]}>Weather Podcast</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes["search-flex"]}>
          <input
            type="text"
            name="city"
            id="city"
            onChange={handleChangeCity}
            value={text}
            className={classes["search-box"]}
          />

          <button className={classes["btn-search"]}>
            <FaSearch className={classes["search-icon"]} />
          </button>
        </div>

        {isBlank && (
          <p className={classes["error-mess"]}>Vui lòng nhập tên thành phố</p>
        )}
      </form>
    </div>
  );
}

export default SearchWeather;
