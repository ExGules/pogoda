import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface ForecastProps {
  forecast: any;
}

function groupByDay(list: any[]) {
  const days: { [date: string]: any[] } = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return days;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;
  const days = groupByDay(forecast.list);
  const dayNames = Object.keys(days).slice(0, 5);

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '16px 0', justifyContent: 'center' }}>
      {dayNames.map(date => {
        const dayData = days[date];
        // Берем прогноз на 12:00, если есть, иначе первый в дне
        const noon = dayData.find((item: any) => item.dt_txt.includes('12:00:00')) || dayData[0];
        return (
          <div key={date} style={{ background: 'var(--card-bg)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)', padding: 16, minWidth: 130, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold', fontSize: 15, marginBottom: 2 }}>
              <FaRegCalendarAlt />
              {new Date(date).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
            </div>
            <img src={`https://openweathermap.org/img/wn/${noon.weather[0].icon}@2x.png`} alt={noon.weather[0].description} />
            <div style={{ fontSize: 20, fontWeight: 500 }}>{Math.round(noon.main.temp)}°C</div>
            <div style={{ fontSize: 12 }}>{noon.weather[0].description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
