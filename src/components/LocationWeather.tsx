import React, { useEffect, useState } from 'react';
import { getWeatherByLocation } from '../api/weatherApi';
import "./../styles/LocationWeather.css"

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
}

const LocationWeather: React.FC = () => {
  const [locationWeather, setLocationWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getWeatherByLocation(latitude, longitude);
      setLocationWeather(data);
    });
  }, []);

  return (
    <div className="location-weather-container">
      {locationWeather && (
        <div className="weather-details">
          <h2>{locationWeather.name}</h2>
          <p>{locationWeather.weather[0].description}</p>
          <p>Temperature: {locationWeather.main.temp}°C</p>
          <p>Humidity: {locationWeather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default LocationWeather;
