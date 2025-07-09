export function useNotifications() {
  // Проверка поддержки
  const isSupported = 'Notification' in window;

  // Запросить разрешение
  const requestPermission = async () => {
    if (!isSupported) return false;
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    return Notification.permission === 'granted';
  };

  // Отправить уведомление, если в прогнозе есть дождь или гроза
  const notifyIfRainOrStorm = async (forecast: any) => {
    if (!isSupported) return;
    const granted = await requestPermission();
    if (!granted) return;
    if (!forecast || !forecast.list) return;

    // Проверяем ближайшие 12 часов (4 интервала по 3 часа)
    const next12h = forecast.list.slice(0, 4);
    const rainOrStorm = next12h.find((item: any) => {
      return item.weather.some((w: any) =>
        w.main === 'Rain' || w.main === 'Thunderstorm'
      );
    });
    if (rainOrStorm) {
      const type = rainOrStorm.weather[0].main === 'Rain' ? 'Дождь' : 'Гроза';
      new Notification('Погода', {
        body: `${type} ожидается в ближайшие часы!`,
        icon: 'https://openweathermap.org/img/wn/10d.png',
      });
    }
  };

  return { notifyIfRainOrStorm };
}
