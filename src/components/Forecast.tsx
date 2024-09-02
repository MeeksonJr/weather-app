import React, { useState, useEffect } from 'react';
import { getForecastByCity } from '../api/weatherApi';

// Adjust the ForecastData interface based on the actual API response
interface ForecastData {
  forecast: {
    forecastday: {
      date: string; // The date in string format
      day: {
        maxtemp_c: number; // Maximum temperature in Celsius
        mintemp_c: number; // Minimum temperature in Celsius
        condition: {
          text: string; // Weather condition description
          icon: string; // Weather icon URL
        };
      };
    }[];
  };
}

interface ForecastProps {
  city: string;
}

const Forecast: React.FC<ForecastProps> = ({ city }) => {
  // Define state with the correct type
  const [forecast, setForecast] = useState<ForecastData['forecast']['forecastday']>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecastByCity(city);
        // Extract and set the forecast data
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    if (city) fetchForecast();
  }, [city]);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>{new Date(day.date).toLocaleDateString()}</p> {/* Use the date string directly */}
          <p>{day.day.condition.text}</p>
          <p>Max Temp: {day.day.maxtemp_c}°C</p> {/* Display maximum temperature */}
          <p>Min Temp: {day.day.mintemp_c}°C</p> {/* Display minimum temperature */}
          <img src={day.day.condition.icon} alt="Weather icon" className="forecast-icon" /> {/* Display weather icon */}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
