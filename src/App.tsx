import { Form, Spinner, WeatherDetails, Alert } from "./components";
import { useWeather } from "./hooks";
import styles from "./App.module.css";

function App() {
  const { weather, fetchWeather, hasWeatherData, isLoading, notFound } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>React Weather App</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {isLoading && <Spinner />}
        {hasWeatherData && <WeatherDetails weather={weather} />}
        {notFound && <Alert>City not found</Alert>}
      </div>
    </>
  );
}

export default App;
