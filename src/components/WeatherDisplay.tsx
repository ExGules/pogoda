import React from 'react';

interface WeatherDisplayProps {
  weather: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-card" style={{ background: 'var(--card-bg)', padding: 16, borderRadius: 12, margin: '16px 0' }}>
      <h2>{weather.name}</h2>
      <div style={{ fontSize: 48 }}>
        {weather.weather && weather.weather[0] && (
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        )}
        {Math.round(weather.main.temp)}°C
      </div>
      <div>{weather.weather && weather.weather[0] && weather.weather[0].description}</div>
      <div>Влажность: {weather.main.humidity}%</div>
      <div>Ветер: {weather.wind.speed} м/с</div>
    </div>
  );
};

export default WeatherDisplay;
