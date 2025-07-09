import { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationManagerProps {
  forecast: any;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ forecast }) => {
  const { notifyIfRainOrStorm } = useNotifications();

  useEffect(() => {
    if (forecast) {
      notifyIfRainOrStorm(forecast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecast]);

  return null;
};

export default NotificationManager;
