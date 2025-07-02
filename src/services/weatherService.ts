import axios from "axios";

export const API_KEY = 'f1d01aa30f46d900cf3feae4a77d33d4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


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
