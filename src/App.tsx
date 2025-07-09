import React, { useEffect } from 'react';
import './styles/themes.css';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import CityInput from './components/CityInput';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import ThemeToggle from './components/ThemeToggle';
import NotificationManager from './components/NotificationManager';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Spinner from './components/Spinner';
import Skeleton from './components/Skeleton';

function App() {
  const geo = useGeolocation();
  const { weather, forecast, loading, error, getByCoords, getByCity } = useWeather();

  const getWeatherBg = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Rain':
        return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
      case 'Clear':
        return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';
      case 'Clouds':
        return 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80';
      case 'Snow':
        return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80';
      case 'Thunderstorm':
        return 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80';
      case 'Drizzle':
        return 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80';
      case 'Mist':
      case 'Fog':
        return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';
      default:
        return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';
    }
  };

  // Получить погоду по геолокации при нажатии
  const handleGeoWeather = () => {
    if (geo.coordinates) {
      getByCoords(geo.coordinates.lat, geo.coordinates.lon);
    }
  };

  // Получить погоду по городу
  const handleCitySearch = (city: string) => {
    getByCity(city);
  };

  const bgUrl = '/bg.jpg';

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        transition: 'background-image 0.5s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Оверлей для затемнения */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(24,24,24,0.45)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      {/* Контент поверх оверлея */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="header-bar">
          <div className="left-corner">
            <button onClick={handleGeoWeather} disabled={!geo.coordinates} style={{ padding: '8px 16px', borderRadius: 6, background: 'var(--primary)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FaMapMarkerAlt />
              Погода по местоположению
            </button>
          </div>
          <div className="right-corner">
            <CityInput onSearch={handleCitySearch} />
            <ThemeToggle />
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '100vh' }}>
          {loading && (
            <>
              <Spinner />
              <div className="weather-card">
                <Skeleton height={40} width={120} style={{ margin: '0 auto 12px auto' }} />
                <Skeleton height={48} width={80} style={{ margin: '0 auto 8px auto' }} />
                <Skeleton height={20} width={100} style={{ margin: '0 auto 8px auto' }} />
                <Skeleton height={20} width={80} style={{ margin: '0 auto 8px auto' }} />
                <Skeleton height={20} width={80} style={{ margin: '0 auto' }} />
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '16px 0', justifyContent: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ background: 'var(--card-bg)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)', padding: 16, minWidth: 130, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <Skeleton height={18} width={90} style={{ margin: '0 auto 8px auto' }} />
                    <Skeleton height={48} width={48} style={{ margin: '0 auto 8px auto' }} />
                    <Skeleton height={20} width={40} style={{ margin: '0 auto 8px auto' }} />
                    <Skeleton height={16} width={60} style={{ margin: '0 auto' }} />
                  </div>
                ))}
              </div>
            </>
          )}
          {!loading && (
            <>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <WeatherDisplay weather={weather} />
              <Forecast forecast={forecast} />
              <NotificationManager forecast={forecast} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
