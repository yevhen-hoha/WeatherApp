import React from 'react';
import { addCityWeather } from '../store/weather/weatherSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
     const [cityInput, setCityInput] = React.useState("");
  return (
    <form action="" onSubmit={(e) => {
                   e.preventDefault();
                   if (cityInput.trim()) {
                   dispatch(addCityWeather(cityInput.trim()));
                   setCityInput("");
           }}}>
                <input
                   type="text"
                   value={cityInput}
                   onChange={(e) => setCityInput(e.target.value)}
                   placeholder="Enter city name"
              />
              <button type='submit'>Add City</button>
           </form>
  )
}
