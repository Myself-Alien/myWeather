import axios from "axios";
import { useState } from "react";
import moment from "moment";
import '../App.css';

const Weather = () => {
    const [city, setCity] = useState('kolkata');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '51402e506157cc14eff84c3ba599ceb8';
    const todayDate = () => {
        const today = moment();
        const formatDate = today.format('dddd, MMMM Do YYYY');
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
            <div className="container">
                <div className="row weather_card">
                    <div className="col-md-6">
                    {todayDate()}
                        <form onSubmit={handelSubmit}>
                            <div className="input-group">
                                <input type="text" placeholder="Enter city name" className="form-control" value={city} onChange={handleInputChange} />
                                <button type="submit" className="btn btn-secondary">Search</button>
                            </div>
                        </form>
                        {
                            weatherData ? (
                                <>
                                    <div className="row">
                                        <h5>{weatherData.name},{weatherData.sys.country}</h5>
                                        <div className="col-md-6">
                                            <p>Temperature: {weatherData.main.temp}°C</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Feels like : {weatherData.main.feels_like}°C</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{weatherData.weather[0].description}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Wind : {weatherData.wind.speed}m/s</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Wind Speed : {weatherData.wind.speed}m/s</p></div>
                                        <div className="col-md-6">
                                            <p>Humidity : {weatherData.main.humidity}%</p>
                                        </div>
                                    </div>
                                </>
                            ) : (<p>Loading...</p>)
                        }
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        </>
    );
}
export default Weather;
