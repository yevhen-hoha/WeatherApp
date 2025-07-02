import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "../styles/pages/DetailPage.module.scss";
import type { RootState } from "../store";
import { useCityHourly } from "../hooks/useCityHourly";


const CityPage: React.FC = () => {
  const { id } = useParams();
  const cityId = Number(id);
  const city = useSelector((state: RootState) =>
    state.weather.cities.find((city) => Number(city.id) === cityId)
  );
const { data: hourly, loading } = city
  ? useCityHourly(city.lat, city.lon)
  : { data: [], loading: false };

console.log(city);
  if (!city) return <>
  <p>City not found</p>
  <Link to='/'>Back to home page</Link>
  </>;

  return (
    <div className={styles.detail}>
     <Link to='/' className={styles.back_button}>Back to previous page</Link>
     <div className={styles.cityInfo}>
        <div>
           <h2>{city.name}</h2>
      <p>{city.description}</p>
      <p>Temperature: {Math.round(city.temp)}°C</p>
     </div>
      <img src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} alt="" />
     </div>

     {loading ? <p>Loading</p>  : <div>
           <h3>Daytime temperature</h3>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourly}>
            <XAxis dataKey="dt" label={{ value: "Hours", position: "insideBottom", offset: -5 }} />
            <YAxis unit="°C" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#3f51b5" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
     </div>}
    </div>
  );
};

export default CityPage;
