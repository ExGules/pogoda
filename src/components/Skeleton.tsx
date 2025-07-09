import React from 'react';

interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  borderRadius?: number | string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 24,
  width = '100%',
  style,
  borderRadius = 8,
}) => (
  <div
    style={{
      background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton 1.2s ease-in-out infinite',
      height,
      width,
      borderRadius,
      ...style,
    }}
  >
    <style>
      {`@keyframes skeleton { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}
    </style>
  </div>
);

export default Skeleton; 