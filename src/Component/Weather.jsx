import axios from "axios";
import {  useState } from "react";
import '../App.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '51402e506157cc14eff84c3ba599ceb8';
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(response.data);
            console.log(response.data); // Get
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
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handelSubmit}>
                    <div className="input-group">
                        <input type="text" placeholder="Enter city name" className="form-control" value={city} onChange={handleInputChange} />
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </div>
                </form>
                {
                    weatherData ? (
                        <>
                            <h5>{weatherData.name}</h5>
                            <p>Temperature: {weatherData.main.temp}°C</p>
                        </>
                    ) : (<p>Loading Data</p>)
                }
            </div>
        </>
    );
}
export default Weather;
