import axios from 'axios';

const API_KEY = '35ab7c937545f793589af7f13a990408'; // <-- сюда вставьте свой ключ
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherByCoords(lat: number, lon: number, lang = 'ru') {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchWeatherByCity(city: string, lang = 'ru') {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchForecastByCoords(lat: number, lon: number, lang = 'ru') {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchForecastByCity(city: string, lang = 'ru') {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`;
  const response = await axios.get(url);
  return response.data;
}
