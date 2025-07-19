import { useState, useEffect } from "react";
import axios from "axios";
import Clock from "./Clock";
import '../App.css';

const Weather = () => {
    const [city, setCity] = useState('kolkata');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '51402e506157cc14eff84c3ba599ceb8';

    const isDaytime = (sunrise, sunset) => {
        const now = Date.now();
        return now >= sunrise * 1000 && now < sunset * 1000;
    };
    const getWeatherIcons = (weatherMain, isDay) => {
        const iconMap = {
            Clear: isDay ? "clear-day.svg" : "clear-night.svg",
            Clouds: isDay ? "partly-cloudy-day.svg" : "partly-cloudy-night.svg",
            Rain: isDay ? "partly-cloudy-day-rain.svg" : "partly-cloudy-night-rain.svg",
            Thunderstorm: "thunderstorm.svg",
            Mist: "mist.svg",
            Drizzle: "drizzle.svg",
            Dust: "dust.svg",
            Fog: "fog.svg",
            Haze: "haze.svg",
            Snow: "snow.svg",
            Wind: "wind.svg",
        };
        return `/weather-icons/${iconMap[weatherMain] || "default.png"}`;
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };
    return (
        <>
            <div className={`container-fluid roboto-font Weather ${weatherData ? (isDaytime(weatherData.sys.sunrise, weatherData.sys.sunset) ? "day" : "night") : ""}`}>
                <h1 className="top_logo p-3 roboto-font">Weather Forecast</h1>
                <div className="container">
                    <div className="card p-4">
                        <div className="row">
                            <div className="col-md-8">
                                <span className="clock pb-2">
                                    <Clock />
                                </span>
                                <form onSubmit={handelSubmit}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Enter city name"
                                            className="form-control"
                                            value={city}
                                            onChange={handleInputChange}
                                        />
                                        <button type="submit" className="btn btn-secondary mybtn">Search</button>
                                    </div>
                                </form>
                                {
                                    weatherData ? (
                                        <>
                                            <div className="row weather_row">
                                                <h4 className="city pt-3">{weatherData.name}, {weatherData.sys.country}</h4>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Feels like: </p>
                                                            <p>{weatherData.main.feels_like}°C</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/hot.gif" alt="Temp" className="icon-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Humidity: </p>
                                                            <p> {weatherData.main.humidity}%</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/humidity.gif" alt="Humidity" className="icon-sm" />
                                                        </div>
                                                    </div>
                                                    <span></span>
                                                </div>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Wind Speed: </p>
                                                            <p>{weatherData.wind.speed} m/s</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/wind.gif" alt="Wind" className="icon-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Rain: </p>
                                                            <p>{weatherData.weather[0].main === "Rain" ? "Yes" : "No"}</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/rain.gif" alt="Rain" className="icon-sm me-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Sunrise: </p>
                                                            <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/sunrise.gif" alt="Sunrise" className="icon-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mini_area">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <p>Sunset: </p>
                                                            <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img src="newicons/sunset.gif" alt="Sunset" className="icon-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (<span>Loading...</span>)
                                }
                            </div>
                            <div className="col-md-4">
                                <div className="right_panel">
                                    {
                                        weatherData ? (
                                            <>
                                                <div className="right_top">{weatherData.weather[0].main} - {weatherData.weather[0].description}</div>
                                                <p className="big_temp">{weatherData.main.temp}°C</p>
                                                <img
                                                    src={getWeatherIcons(
                                                        weatherData.weather[0].main,
                                                        isDaytime(weatherData.sys.sunrise, weatherData.sys.sunset)
                                                    )}
                                                    className="img-fluid"
                                                    alt={weatherData.weather[0].description}
                                                />
                                            </>
                                        ) : (<span>Loading...</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
