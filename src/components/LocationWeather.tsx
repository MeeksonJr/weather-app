import React, { useEffect, useState } from 'react';
import { getWeatherByLocation } from '../api/weatherApi';
import "./../styles/LocationWeather.css";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
}

const LocationWeather: React.FC = () => {
  const [locationWeather, setLocationWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Fetch weather data and ensure it matches the WeatherData type
        const data = await getWeatherByLocation(latitude, longitude);
        
        // Type assertion to WeatherData
        if (data && 'name' in data && 'weather' in data && 'main' in data) {
          setLocationWeather(data as WeatherData);
        } else {
          console.error('Invalid weather data:', data);
          setError('Failed to fetch weather data.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data.');
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error('Error getting location:', error);
      setError('Error getting location.');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="location-weather-container">
      {locationWeather ? (
        <div className="weather-details">
          <h2>{locationWeather.name}</h2>
          <p>{locationWeather.weather[0].description}</p>
          <p>Temperature: {locationWeather.main.temp}°C</p>
          <p>Humidity: {locationWeather.main.humidity}%</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default LocationWeather;
