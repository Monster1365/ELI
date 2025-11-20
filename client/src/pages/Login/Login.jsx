import { Button } from "flowbite-react";
import FormBar from "../../components/FormBar"
import styles from "./Login.module.css"

export default function Login() {
  return (
    <div className={styles.loginBody}>
      <div className={styles.container}>
        <FormBar type={ "" } text={"id"} />
        <FormBar type={ "" } text={"password"} />
        
        <div id={styles.button} className="flex flex-wrap gap-2">
          <Button type="submit" color="alternative" pill> Submit </Button>
        </div>
      </div>
      <div className={styles.circle}>
      </div>
    </div>
  );
}