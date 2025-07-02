import { useState, useEffect } from "react";
import { fetchWeatherForecast } from "../services/weatherService";

export const useCityHourly = (lat: number, lon: number) => {
  const [data, setData] = useState<{ dt: number; temp: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const forecast = await fetchWeatherForecast(lat, lon);
        const today = new Date().getDate();

        const filtered = forecast.list
          .filter((item: any) => new Date(item.dt_txt).getDate() === today)
          .map((item: any) => ({
            dt: new Date(item.dt_txt).getHours(),
            temp: item.main.temp,
          }));

        setData(filtered);
      } catch (err) {
        console.error("Failed to load forecast:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [lat, lon]);

  return { data, loading };
};
