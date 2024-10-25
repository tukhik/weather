// src/components/WeatherForecast.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import Modal from './Modal';

const WeatherForecast = ({ lat, lon }) => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const closeModal = () => setIsModalOpen(false);
    console.log(isModalOpen, "isModalOpen")

    const API_KEY = '6593100b5b8602160614fcf0f1a1f252'; // Replace with your actual API key
    const fetchWeatherData = async () => {
      console.log(inputValue, "inputValueinputValueinputValue");
      
      
      const apiKey = '6593100b5b8602160614fcf0f1a1f252'; // Replace with your actual API key
      const city = !!inputValue ? inputValue : 'Yerevan';
      console.log(city, "city");
      
      const units = "metric";
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
        try {
            const response = await axios.get(url);
            setForecast(response.data);
        } catch (err) {
            setError(err);
            setIsModalOpen(true)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [lat, lon, API_KEY]);

    if (loading) return <p>Loading...</p>;
    // if(error)

    return (
        <div>
          <Navbar searchValue={inputValue} setSearchValue={setInputValue} getSearchData={fetchWeatherData}/>
            <h2>{forecast.city.name}</h2>
            {forecast && (
                <ul>
                    {forecast.list.map((item, index) => (
                        <li key={index}>
                            {new Date(item.dt * 1000).toLocaleString()}: {item.main.temp}°K
                        </li>
                    ))}
                </ul>
            )}
        {isModalOpen && <Modal messgae={error?.message} onClose={closeModal} />}
        </div>
    );
};

export default WeatherForecast;
