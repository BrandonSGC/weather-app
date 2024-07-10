import { formatTemperature } from "../../helpers";
import type { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetails.module.css";

type WeatherDetailsProps = {
  weather: Weather;
};

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  return (
    <div className={styles.container}>
      <h1>{weather.name}'s Weather</h1>
      <p className={styles.current}>
        {formatTemperature(weather.main.temp)}&deg;C
      </p>
      <div className={styles.temperatures}>
        <p>
          Min: <span>{formatTemperature(weather.main.temp)}&deg;C</span>
        </p>
        <p>
          Max: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
      </div>
    </div>
  );
};
