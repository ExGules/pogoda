import { useState, useCallback } from 'react';
import { fetchWeatherByCoords, fetchWeatherByCity, fetchForecastByCoords, fetchForecastByCity } from '../utils/api';

export function useWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (e: any) {
      setError(e.message || 'Ошибка получения погоды');
    } finally {
      setLoading(false);
    }
  }, []);

  const getByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (e: any) {
      setError(e.message || 'Ошибка получения погоды');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, getByCoords, getByCity };
}
