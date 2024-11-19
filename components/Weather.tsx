import { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import useWeather from '../hooks/useWeather';  // Путь к хуку
import styles from './Weather.module.sass';

const Weather = () => {
  const { weather, error } = useWeather();  // Используем хук для получения данных о погоде

  return (
    <div className={styles.weather_container}>
      {error && <p>{error}</p>}
      {weather && (
        <WeatherCard
          temperature={weather.temperature}
          weatherDescription={weather.weatherDescription}
          temperatureDescription={weather.temperatureDescription}
        />
      )}
    </div>
  );
};

export default Weather;
