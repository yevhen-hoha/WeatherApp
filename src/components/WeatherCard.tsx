import React from "react";
import styles from "../styles/components/WeatherCard.module.scss";
import type { CityWeather } from "../store/weather/weatherSlice";
import {removeCity, updateCityWeather } from "../store/weather/weatherSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface Props {
  data: CityWeather;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/city/${data.id}`)}>
      <div className={styles.top}>
        <h3>{data.name}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
        />
      </div>
      <p>{Math.round(data.temp)}°C – {data.description}</p>
      <div className={styles.actions}>
        <button className={styles.secondary} onClick={(e) => {e.stopPropagation(); dispatch(updateCityWeather(data.name))}}>Update</button>
         <button onClick={(e) => {e.stopPropagation(); dispatch(removeCity(data.name)); }}>
          ❌ Delete
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
