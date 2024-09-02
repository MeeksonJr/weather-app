import React, { useState, useEffect } from 'react';
import './../styles/Weather.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface ForecastData {
  list: {
    dt: number;
    main: { temp: number; humidity?: number; wind_kph?: number };
    weather: { description: string; icon?: string }[];
  }[];
}

const Weather: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<ForecastData['list']>([]);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const [defaultForecast, setDefaultForecast] = useState<ForecastData['list']>([
    { dt: 0, main: { temp: 20 }, weather: [{ description: 'Sunny', icon: 'http://openweathermap.org/img/wn/01d.png' }] },
    { dt: 86400, main: { temp: 22 }, weather: [{ description: 'Partly Cloudy', icon: 'http://openweathermap.org/img/wn/02d.png' }] },
    { dt: 172800, main: { temp: 18 }, weather: [{ description: 'Rainy', icon: 'http://openweathermap.org/img/wn/10d.png' }] },
    { dt: 259200, main: { temp: 21 }, weather: [{ description: 'Thunderstorms', icon: 'http://openweathermap.org/img/wn/11d.png' }] },
    { dt: 345600, main: { temp: 19 }, weather: [{ description: 'Clear', icon: 'http://openweathermap.org/img/wn/01d.png' }] },
    { dt: 432000, main: { temp: 20 }, weather: [{ description: 'Cloudy', icon: 'http://openweathermap.org/img/wn/03d.png' }] },
    { dt: 518400, main: { temp: 23 }, weather: [{ description: 'Windy', icon: 'http://openweathermap.org/img/wn/50d.png' }] },
  ]);

  // Temperature conversion function
  const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;

  // Wind speed conversion function
  const kphToMph = (kph: number) => kph * 0.621371;

  // Fetch weather data function
  const fetchWeatherData = async (location: string | null, lat?: number, lon?: number) => {
    try {
      const apiKey = '4b0204496c884566a1604653240109';
      let url = '';
      if (lat && lon) {
        url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
      } else if (location) {
        url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch forecast data function
  const fetchForecastData = async (location: string | null, lat?: number, lon?: number) => {
    try {
      const apiKey = '4b0204496c884566a1604653240109';
      let url = '';
      if (lat && lon) {
        url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;
      } else if (location) {
        url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setForecastData(data.forecast.forecastday.map((day: any) => ({
        dt: new Date(day.date).getTime() / 1000,
        main: { temp: day.day.avgtemp_c, humidity: day.day.avghumidity, wind_kph: day.day.maxwind_kph },
        weather: [{ description: day.day.condition.text, icon: day.day.condition.icon }],
      })));
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // Handle search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLocation && !location) {
      fetchWeatherData(null, userLocation.lat, userLocation.lon);
      fetchForecastData(null, userLocation.lat, userLocation.lon);
    } else if (location) {
      fetchWeatherData(location);
      fetchForecastData(location);
      setSelectedDay(null); // Reset selected day when changing location
    }
  };

  // Handle day click
  const handleDayClick = (day: any) => {
    setSelectedDay(day);
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          fetchWeatherData(null, position.coords.latitude, position.coords.longitude);
          fetchForecastData(null, position.coords.latitude, position.coords.longitude);
          setLocation("Current Location");  // Update input field to "Current Location"
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchForecastData('New York'); // Default city for the demo forecast
  }, []);

  // Format date and day for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSearch} className="weather-form">
        <input 
          type="text" 
          value={location} 
          onChange={handleLocationChange} 
          placeholder="Enter location" 
        />
        <button type="submit">Get Weather</button>
        <button type="button" onClick={getUserLocation} className="location-button">
          <i className="fas fa-map-marker-alt"></i>
        </button>
      </form>

      <div className="weather-info">
        {selectedDay ? (
          <>
            <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
            <h3>{formatDate(selectedDay.dt)}</h3>
            <p>Temperature: {celsiusToFahrenheit(selectedDay.main.temp).toFixed(1)}°F</p>
            <p>Condition: {selectedDay.weather[0].description}</p>
            {selectedDay.weather[0].icon && (
              <img src={selectedDay.weather[0].icon} alt="Weather icon" />
            )}
            <p>Humidity: {selectedDay.main.humidity}%</p>
            <p>Wind: {kphToMph(selectedDay.main.wind_kph).toFixed(1)} mph</p>
          </>
        ) : (
          weatherData && (
            <>
              <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
              <p>Temperature: {celsiusToFahrenheit(weatherData.current.temp_c).toFixed(1)}°F</p>
              <p>Condition: {weatherData.current.condition.text}</p>
              <img src={weatherData.current.condition.icon} alt="Weather icon" />
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Wind: {kphToMph(weatherData.current.wind_kph).toFixed(1)} mph</p>
            </>
          )
        )}
      </div>

      <div className="forecast-info">
        <h3>Weekly Forecast</h3>
        <div className="forecast-container">
          {(forecastData && forecastData.length ? forecastData : defaultForecast).map((day, index) => (
            <div 
              key={index} 
              className={`forecast-day ${selectedDay && selectedDay.dt === day.dt ? 'highlighted' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <p>{weatherData ? weatherData.location.name : "Location"}</p>
              <p>{formatDate(day.dt)}</p>
              {day.weather[0].icon && (
                <img src={day.weather[0].icon} alt="Weather icon" />
              )}
              <p>{celsiusToFahrenheit(day.main.temp).toFixed(1)}°F</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
