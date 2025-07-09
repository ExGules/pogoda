import React from 'react';

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 48,
  height: 48,
  border: '4px solid #eee',
  borderTop: '4px solid var(--primary)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '32px auto',
};

const Spinner: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={spinnerStyle} />
    <style>
      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Spinner; 