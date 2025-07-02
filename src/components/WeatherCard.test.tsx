import * as React from "react";
import WeatherCard from "./WeatherCard";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { removeCity } from "../store/weather/weatherSlice";

jest.mock("react-router-dom", () => ({
     ...jest.requireActual("react-router-dom"),
     useNavigate: jest.fn(),
}));

jest.mock("../store/weather/weatherSlice", () => ({
     ...jest.requireActual("../store/weather/weatherSlice"),
     removeCity: jest.fn((name: string) => ({ type: "REMOVE_CITY", payload: name })),
}));

const mockNavigate = jest.fn();

const mockWeather = {
     id: "1",
     name: "Kyiv",
     icon: "01d",
     description: "clear sky",
     temp: 25.5,
     lat: 50.45,
     lon: 30.523,
};

function renderWithStore(ui: React.ReactElement, store: any) {
     return render(
          <Provider store={store}>
               <MemoryRouter>
                    {ui}
               </MemoryRouter>
          </Provider>
     );
}

describe("WeatherCard Component", () => {
     let store: any;

     beforeEach(() => {
          (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
          store = { dispatch: jest.fn(), getState: jest.fn(), subscribe: jest.fn() };
     });

     it("renders city name, temperature, and description", () => {
          renderWithStore(<WeatherCard data={mockWeather} />, store);
          expect(screen.getByText("Kyiv")).toBeInTheDocument();
          expect(screen.getByText(/25°C/)).toBeInTheDocument();
          expect(screen.getByText(/clear sky/)).toBeInTheDocument();
     });

     it("renders weather icon with correct src and alt", () => {
          renderWithStore(<WeatherCard data={mockWeather} />, store);
          const img = screen.getByAltText("clear sky") as HTMLImageElement;
          expect(img).toBeInTheDocument();
          expect(img.src).toContain("https://openweathermap.org/img/wn/01d@2x.png");
     });

     it("navigates to city page on card click", () => {
          renderWithStore(<WeatherCard data={mockWeather} />, store);
          fireEvent.click(screen.getByText("Kyiv"));
          expect(mockNavigate).toHaveBeenCalledWith("/city/1");
     });

     it("dispatches removeCity and stops propagation on delete button click", () => {
          renderWithStore(<WeatherCard data={mockWeather} />, store);
          const button = screen.getByRole("button", { name: /видалити/i });
          const stopPropagation = jest.fn();
          fireEvent.click(button, { stopPropagation });
          expect(store.dispatch).toHaveBeenCalledWith(removeCity("Kyiv"));
     });
});
