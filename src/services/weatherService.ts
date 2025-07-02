import axios from "axios";

export const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function fetchCurrentWeather(city: string) {
     const res = await axios.get(`${BASE_URL}/weather`, {
     params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang:  "en"
     }
     });
     return res.data;
}


export async function fetchWeatherForecast(lat: number, lon: number) {
     const res = await axios.get(`${BASE_URL}/forecast`, {
          params: {
               lat,
               lon,
               appid: API_KEY,
               units: 'metric',
               lang: "en"
          }
     });
     return res.data;
}
