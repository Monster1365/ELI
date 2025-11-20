import { Button } from "flowbite-react";
import FormBar from "../../components/FormBar"
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";
import getUserProfile from "../../api/getUserProfile";
import login from "../../api/login";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [formDatas, setFormDatas] = useState({
    id: "",
    password: "",
  });
  const [status, setStatus] = useState(null);

  const loadProfile = async () => {
    const profile = await getUserProfile();
    console.log("loadProfile:", profile);
    setStatus(profile.inputStatus);
  };

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
    localStorage.removeItem("token");
    const inputCheck = checkInput();
    // alert(JSON.stringify(formDatas, null, 2))
    const success = await login(formDatas.id, formDatas.password);
    if (success) {
      navigate("/home");
    }
    loadProfile();
    console.log("login success", success);
    console.log("inputCheck: ", inputCheck);
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
      </div>
    </div>
  );
}