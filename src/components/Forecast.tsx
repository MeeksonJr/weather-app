import React, { useState, useEffect } from 'react';
import { getForecastByCity } from '../api/weatherApi';

interface ForecastData {
  list: {
    dt: number;
    main: { temp: number };
    weather: { description: string }[];
  }[];
}

interface ForecastProps {
  city: string;
}

const Forecast: React.FC<ForecastProps> = ({ city }) => {
  const [forecast, setForecast] = useState<ForecastData['list']>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const data = await getForecastByCity(city);
      setForecast(data.list);
    };

    if (city) fetchForecast();
  }, [city]);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>{day.weather[0].description}</p>
          <p>Temp: {day.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
