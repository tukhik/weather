import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import Modal from './Modal';

const WeatherForecast = () => {
    const apiKey = '6593100b5b8602160614fcf0f1a1f252';
    const [units, setUnits] = useState('metric');
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    
    const fetchWeatherData = async (cityName) => {
        const city = inputValue || cityName;

        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
        try {
            const response = await axios.get(url);
            setForecast(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                if(!inputValue){
                    await getCityName(latitude, longitude);
                }
                setLoading(false);
              },
              (err) => {
                setError(err.message);
                setLoading(false);
              }
            );
          } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
          }
        };
        
        const getCityName = async (lat, lon) => {
          try {
            const response = await axios.get(
              `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );
            fetchWeatherData(response.data?.name)
            setInputValue(response.data?.name)
          } catch (err) {
            setError('Unable to retrieve city name.');
          }
        };
    
        getLocation();
        // eslint-disable-next-line
      }, [units]);
    

    const closeErrorModal = () => {
        setError(null);
    };

    if (loading) return <p>Loading...</p>;


    return (
        <div>
            <Navbar 
                searchValue={inputValue} 
                setSearchValue={setInputValue} 
                getSearchData={fetchWeatherData}
                units={units}
                setUnits={setUnits}
                getWeather={fetchWeatherData}
            />
            <h2>{forecast?.city.name}</h2>
            {forecast && (
                <ul>
                    {forecast.list.map((item, index) => (
                        <li key={index}>
                            {new Date(item.dt * 1000).toLocaleString()}: {item.main.temp}°{units === 'metric' ? 'C' : 'F'}
                        </li>
                    ))}
                </ul>
            )}
            {!!error && (
                <Modal isOpen={!!error} onClose={closeErrorModal}>
                    <h2>Error</h2>
                    <p>{error?.message}</p>
                </Modal>
            )}
        </div>
    );
};


export default WeatherForecast;
