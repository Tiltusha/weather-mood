import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getTemperatureDescription, weatherConditions } from '../../utils/temperatureMapper';

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;

  if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  try {
    console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);

    const weatherResponse = await axios.get<WeatherData>('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        lang: 'ru',
      },
    });

    const { temperature, weathercode } = weatherResponse.data.current_weather;
    const weatherDescription = weatherConditions[weathercode] || 'Неизвестная погода';
    const temperatureDescription = getTemperatureDescription(temperature);

    console.log('Weather data received:', weatherResponse.data);
    return res.status(200).json({
      temperature,
      weatherDescription,
      temperatureDescription,
    });
  } catch (error) {

    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
