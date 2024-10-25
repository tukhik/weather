const API_KEY = "6593100b5b8602160614fcf0f1a1f252";

export const currentWeather = (city = "Yerevan") => {
  return async (dispatch) => {
    const units = "metric";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;
    dispatch({ type: 'GET_CURRENT_WEATHER' });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: GET_TODAYS_WEATHER, payload: data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const futureWeather = (city = "Yerevan") => {
  return async (dispatch) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    dispatch({ type: 'FETCH_WEATHER' });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: GET_NEXT_DAYS_WEATHER, payload: data });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

