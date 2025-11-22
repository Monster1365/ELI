import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

export default function Auth() {
  return (<div className={styles.authBody}>
    <div className={styles.container}>
      <h2 className={styles.text}>Wellcome</h2>
      <Link to="/Login">
        <button className={styles.loginButton}>Login</button>
      </Link>
      <Link to="/SignUp">
        <button className={styles.signButton}>Sign up</button>
      </Link>
    </div>
  </div>);
}