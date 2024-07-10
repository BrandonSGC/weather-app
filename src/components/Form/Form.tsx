import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";
import { Alert } from "..";
import styles from "./Form.module.css";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export const Form = ({ fetchWeather }: FormProps) => {
  const [alert, setAlert] = useState("");
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation.
    if (Object.values(search).includes("")) {
      setAlert("All fields are necessary");
      return;
    }

    setAlert("");
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}

      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select name="country" id="country" onChange={handleChange}>
          <option value="">-- Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Get weather" />
    </form>
  );
};
