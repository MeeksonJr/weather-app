import axios from 'axios';

const API_KEY = '4b0204496c884566a1604653240109';
const BASE_URL = 'https://api.weatherapi.com/v1';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

interface ForecastData {
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`);
  return response.data;
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
  return response.data;
};

export const getWeatherByLocation = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`);
  return response.data;
};
