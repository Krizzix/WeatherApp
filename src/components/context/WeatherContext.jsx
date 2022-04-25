import { createContext, useReducer } from "react";
import WeatherReducer from "./WeatherReducer";

const WeatherContext = createContext({});
export const WeatherProvider = ({ children }) => {
  const initialState = {
    weatherObj: {
      /* main: { temp: "" } */
    },
    currentLocation: {},
    currentLocationName: { local_names: { vi: "" } },
    isError: false,
  };
  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  const showPosition = (pos) => {
    // setLatitude(pos.coords.latitude);
    // setLongtitude(pos.coords.longitude);

    dispatch({
      type: "GET_CURRENT_LOCATION",
      payload: { lat: pos.coords.latitude, lon: pos.coords.longitude },
    });
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.error("Error");
    }
  };

  // const getLocationName = async (lat, lon) => {
  //   const response = await fetch(
  //     `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=4820c5495db0788738f7a68984718ab9`
  //   );
  //   const data = await response.json();
  //   const [{ country, local_names }] = data;
  //   dispatch({
  //     type: "GET_CURRENT_LOCATION_NAME",
  //     payload: { country, local_names },
  //   });
  //   // setnameLocation(local_names.vi);
  //   // setCountry(country);
  // };
  const getWeather = () => {
    // const res = await fetch(
    //   "https://api.openweathermap.org/data/2.5/weather?lat=21.028511&lon=105.804817&appid=c5cf9fdf630b45782fa31d5e3629a9a6"
    // );
    // const data = await res.json();
    // const { weather } = data;
    // console.log(weather);
    getLocation();
    const latitude = state.currentLocation.lat;
    const longtitude = state.currentLocation.lon;

    if (latitude != null && longtitude != null) {
      // getLocationName(latitude, longtitude);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&lang=vi&appid=4820c5495db0788738f7a68984718ab9`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "GET_CURRENT_WEATHER", payload: data });
        });
    }
  };
  const SearchWeather = async (text) => {
    const respon = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${text}&lang=vi&appid=4820c5495db0788738f7a68984718ab9`
    );
    if (respon.ok) {
      dispatch({ type: "IS_ERROR", payload: false });
      const data = await respon.json();
      dispatch({ type: "GET_CURRENT_WEATHER", payload: data });
    } else {
      dispatch({ type: "IS_ERROR", payload: true });
    }
  };
  return (
    <WeatherContext.Provider
      value={{
        weatherObj: state.weatherObj,
        getWeather,
        getLocation,
        currentLocation: state.currentLocation,
        lon: state.currentLocation.lon,
        SearchWeather,
        isError: state.isError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
