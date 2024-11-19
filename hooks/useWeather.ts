import { useEffect, useState } from 'react';
import axios from 'axios';

interface Weather {
  temperature: number;
  weatherDescription: string;
  temperatureDescription: string;
}

const useWeather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const cachedWeather = localStorage.getItem('weatherData');
      if (cachedWeather) {
        setWeather(JSON.parse(cachedWeather));
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              console.log(`Fetching weather for lat: ${latitude}, lon: ${longitude}`);
              const response = await axios.get('/api/weather', {
                params: {
                  lat: latitude.toString(),
                  lon: longitude.toString(),
                },
              });

              console.log('Weather data received:', response.data);
              const weatherData = response.data;
              setWeather(weatherData);
              localStorage.setItem('weatherData', JSON.stringify(weatherData));
            } catch (error) {
              console.error('Error fetching weather data:', error);
              setError('Не удалось получить данные о погоде');
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Не удалось получить местоположение');
          }
        );
      } else {
        setError('Геолокация не поддерживается этим браузером');
      }
    };

    fetchWeather();
  }, []);

  return { weather, error };
};

export default useWeather;
