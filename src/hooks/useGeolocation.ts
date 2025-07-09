import { useState, useEffect } from 'react';

interface GeolocationState {
  loaded: boolean;
  coordinates?: {
    lat: number;
    lon: number;
  };
  error?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ loaded: false });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ loaded: true, error: 'Геолокация не поддерживается' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      },
      (error) => {
        setState({ loaded: true, error: error.message });
      }
    );
  }, []);

  return state;
}
