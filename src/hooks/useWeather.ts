import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

// Define weather object structure.
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

// Create the weather type infering it from zod.
export type Weather = z.infer<typeof Weather>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const { city, country } = search;
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      setIsLoading(true);
      setNotFound(false);
      setWeather(initialState);

      // Get latitude and longitude.
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;
      const { data } = await axios(geoUrl);

      if (!data[0]) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const { lat, lon } = data[0];

      // Get the wather result.
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    fetchWeather,
    weather,
    hasWeatherData,
    isLoading,
    notFound,
  };
};
