import { useState } from "react";
import axios from "axios";
import Clock from "./Clock";
import '../App.css';

const Weather = () => {
    const [city, setCity] = useState('kolkata');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '51402e506157cc14eff84c3ba599ceb8';
    const getWeatherIcons = (weatherMain) => {
        const iconMap = {
            Clear: "clear.svg",
            Clouds: "clouds.svg",
            Rain: "rain.svg",
            Thunderstorm: "thunderstorm.svg",
            Mist: "mist.svg",
        };
        return `/weather-icons/${iconMap[weatherMain] || "default.png"}`;
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(response.data);
            console.log(response.data); // console data
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };
    return (
        <>
            <div className="container-fluid roboto-font Weather">
                <h1 className="p-3 roboto-font">Weather Forcast</h1>
                <div className="container">
                    <div className="card p-4">
                        <div className="row">
                            <div className="col-md-6">
                                <Clock />
                                <form onSubmit={handelSubmit}>
                                    <div className="input-group">
                                        <input type="text" placeholder="Enter city name" className="form-control" value={city} onChange={handleInputChange} />
                                        <button type="submit" className="btn btn-secondary">Search</button>
                                    </div>
                                </form>
                                {
                                    weatherData ? (
                                        <>
                                            <div className="row weather_row">
                                                <h5>{weatherData.name}, {weatherData.sys.country}</h5>
                                                <div className="col-md-6 p-4">
                                                    <span>Temperature: {weatherData.main.temp}°C</span>
                                                </div>
                                                <div className="col-md-6 p-4">
                                                    <span>Feels like : {weatherData.main.feels_like}°C</span>
                                                </div>
                                                <div className="col-md-6 p-4">
                                                    <span>Pressure : {weatherData.main.pressure}</span>
                                                </div>
                                                <div className="col-md-6 p-4">
                                                    <span>Wind : {weatherData.wind.speed}m/s</span>
                                                </div>
                                                <div className="col-md-6 p-4">
                                                    <span>Wind Speed : {weatherData.wind.speed}m/s</span>
                                                </div>
                                                <div className="col-md-6 p-4">
                                                    <span>Humidity : {weatherData.main.humidity}%</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (<span>Loading...</span>)
                                }
                            </div>
                            <div className="col-md-6 right_panel">
                                {weatherData ? (
                                    <>
                                        <span>{weatherData.weather[0].main} - {weatherData.weather[0].description}</span>
                                        <p className="big_temp">{weatherData.main.temp}°C</p>
                                        <img
                                            src={getWeatherIcons(weatherData.weather[0].main)}
                                            alt={weatherData.weather[0].description}
                                        />
                                    </>
                                ) : (<span>Loading...</span>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Weather;
