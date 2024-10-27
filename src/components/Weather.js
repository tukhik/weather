import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import Modal from './Modal';

const WeatherForecast = () => {
    const [units, setUnits] = useState('metric'); // Default to metric
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const fetchWeatherData = async () => {
        const apiKey = '6593100b5b8602160614fcf0f1a1f252';
        const city = inputValue || 'Yerevan';

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
        fetchWeatherData();
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
