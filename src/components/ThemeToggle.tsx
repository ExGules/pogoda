import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        borderRadius: 6,
        background: 'var(--card-bg)',
        color: 'var(--text)',
        border: '1px solid var(--primary)',
        marginLeft: 16,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />} {theme === 'dark' ? 'Темная' : 'Светлая'}
    </button>
  );
};

export default ThemeToggle;
