import { countries } from "../data/countries";
import styles from './Form.module.css';

export const Form = () => {
  return (
    <form className={styles.form}>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" placeholder="City" />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select name="country" id="country">
          <option value="">-- Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
