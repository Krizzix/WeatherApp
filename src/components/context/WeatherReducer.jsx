const WeatherReducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    // case "GET_CURRENT_LOCATION_NAME":
    //   return { ...state, currentLocationName: action.payload };
    case "GET_CURRENT_WEATHER":
      return { ...state, weatherObj: action.payload };
    case "IS_ERROR":
      return { ...state, isError: action.payload };

    default:
      return state;
  }
};
export default WeatherReducer;
