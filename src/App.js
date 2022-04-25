import "./App.css";

import GetCurrentWeather from "./components/GetCurrentWeather";
import SearchWeather from "./components/SearchWeather";
import { useContext } from "react";
import WeatherContext from "./components/context/WeatherContext";
function App() {
  const { weatherObj } = useContext(WeatherContext);
  return (
    <div className="App">
      <div
        className={`container ${
          Object.keys(weatherObj).length !== 0 && weatherObj.weather[0].main
        }`}
      >
        <SearchWeather />
        <GetCurrentWeather />
      </div>
    </div>
  );
}

export default App;
