import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "../../services/weatherService";
export interface CityWeather {
  id: string;
  name: string;
  temp: number;
  description: string;
  icon: string;
  lat: number;
  lon: number;
}

interface WeatherState {
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,

}
export const addCityWeather = createAsyncThunk(
  "weather/addCityWeather",
  async (cityName: string) => {
    const data = await fetchCurrentWeather(cityName);
    return {
      id: data.id,
      name: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter((city) => city.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCityWeather.fulfilled, (state, action: PayloadAction<CityWeather>) => {
        const existingIndex = state.cities.findIndex(city => city.name.toLowerCase() === action.payload.name.toLowerCase());
        if (existingIndex !== -1) {
          state.cities[existingIndex] = action.payload;
        } else {
          state.cities.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
