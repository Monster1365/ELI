import { useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import FormBar from "../../components/FormBar"
import styles from "./Login.module.css"
import login from "../../api/login";

export default function Login() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [formDatas, setFormDatas] = useState({
    id: "",
    password: "",
  });

  const handleChange = e => {    
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  const checkInput = () => {
    if (formDatas.id.length > 10) {
      alert("id is too long");
      formDatas.id = "";
      formDatas.password = "";
      setStatus("failure");
      return "too long id";
    }
    return "good id"
  };

  //로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkInput();
    const success = await login(formDatas.id, formDatas.password);
    if (success) {
      setStatus("success");
      navigate("/Home", {state: {content: "home"}});
    } else {
      setStatus("failure");
    }
  };

  return (
    <div className={styles.loginBody}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <p>Log in</p>
        <FormBar
          status={ status }
          textType={ "id" }
          name="id"
          value={ formDatas.id }
          onChange={ handleChange }
        />
        <FormBar
          status={ status }
          textType={ "password" }
          name="password"
          value={ formDatas.password }
          onChange={ handleChange }
        />
        <label className={styles.bottomLabel}>{ status === "failure" ? "something was wrong! try again.." : "" }</label>
        <div id={styles.button} className="flex flex-wrap gap-2">
          <Button type="submit" color="alternative" pill> Submit </Button>
        </div>
      </form>
      <div className={styles.circle}>
        <button onClick={() => navigate("/")} className={styles.gobackButton}>Go Back</button>
        <button onClick={() => navigate("/SignUp")} className={styles.signButton}>Sign up</button>
      </div>
    </div>
  );
}