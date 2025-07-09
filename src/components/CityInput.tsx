import React, { useState } from 'react';

interface CityInputProps {
  onSearch: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Введите город"
        style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: 'var(--primary)', color: '#fff', border: 'none' }}>
        Поиск
      </button>
    </form>
  );
};

export default CityInput;
