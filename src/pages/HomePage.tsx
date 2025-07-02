import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCityWeather, type CityWeather } from '../store/weather/weatherSlice';
import type { AppDispatch } from '../store/index';
import WeatherCard from '../components/WeatherCard';
import Form from '../components/Form';

export default function HomePage() {
 const dispatch = useDispatch<AppDispatch>();
   const cities = useSelector((state: any) => state.weather.cities);

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
     const cityNames = cities.map((city: CityWeather) => city.name);
     localStorage.setItem("weather-cities", JSON.stringify(cityNames));
   }, [cities]);

   return (
     <>
           <div className="App">
           <h1>Weather App</h1>
           <Form></Form>
           <ul>
               {cities.length === 0 && <p>No cities added yet</p>}
                {cities.map((city: CityWeather) => (
               <WeatherCard key={city.id} data={city} />
                ))}
           </ul>
           </div>
     </>

  )
}
