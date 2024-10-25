import { combineReducers } from "redux";

const initialStateCurrentWeather = {
  name: "Yerevan",
  min: 0,
  max: 0
};

const weatherReducer = (state = initialStateCurrentWeather, action) => {
  switch (action.type) {
    case "GET_CURRENT_WEATHER":
      return {
        name: action.payload.name,
        max: action.payload.main.temp_max,
        min: action.payload.main.temp_min
      };
    default:
      return state;
  }
};


const initStateWeather = {
  name: "Yerevan",
  list: []
};

const futureWeatherReducer = (state = initStateWeather, action) => {
  switch (action.type) {
    case "GET_TODAYS_WEATHER":
      return {
        name: action.payload.city.name,
        list: action.payload.list

      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weatherReducer: weatherReducer,
  futureWeatherReducer: futureWeatherReducer,
});

export default rootReducer;