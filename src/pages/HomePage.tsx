import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCityWeather, type CityWeather } from '../store/weather/weatherSlice';
import type { AppDispatch } from '../store/index';
import WeatherCard from '../components/WeatherCard';
import Form from '../components/Form';
import { toast } from 'react-toastify';

export default function HomePage() {
 const dispatch = useDispatch<AppDispatch>();
   const weather = useSelector((state: any) => state.weather);

   useEffect(() => {
     const stored = localStorage.getItem("weather-cities");
     if (stored) {
       const parsed: string[] = JSON.parse(stored);
       parsed.forEach((cityName) => {
         dispatch(addCityWeather(cityName));
       });
     }
   }, []);

   useEffect(() => {
      const cityNames = weather.cities.map((city: CityWeather) => city.name);
       localStorage.setItem("weather-cities", JSON.stringify(cityNames));
   }, [weather.cities]);

   useEffect(() => {
     if (weather.error) {
           toast.dark(weather.error);
           dispatch({ type: 'weather/clearError' });
     }
   },[weather.error]);
   return (
     <>
           <div className="App">
           <h1>Weather App</h1>
           <Form></Form>

           <ul>
               {weather.cities.length === 0 && <p>No cities added yet</p>}
                {weather.cities.map((city: CityWeather) => (
               <WeatherCard key={city.id} data={city} />
                ))}
           </ul>
           </div>
     </>

  )
}
