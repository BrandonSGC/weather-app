import styles from "./App.module.css";
import { Form } from "./components";

function App() {
  return (
    <>
      <h1 className={styles.title}>Hi there!!!</h1>

      <div className={styles.container}>
        <Form />
      </div>
    </>
  );
}

export default App;
