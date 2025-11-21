import { Button } from "flowbite-react";
import FormBar from "../../components/FormBar"
import styles from "./SignUp.module.css"
import { useNavigate } from "react-router-dom";
import registerUser from "../../api/registerUser";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [formDatas, setFormDatas] = useState({
    email: "",
    id: "",
    password: "",
    username: "",
  });
  const [status, setStatus] = useState(null);

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
      return "bad id";
    }
    return "good id"
  };

  //유저등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputCheck = checkInput();
    const success = await registerUser(formDatas)
    if (success) {
      alert("you are success to register! now goto login page")
      navigate("/login");
    } else {
      setStatus("failure");
    }
    console.log("Signup success", success);
    console.log("inputCheck: ", inputCheck);
  };

  return (
    <div className={styles.signupBody}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <p>Sign up</p>
        <FormBar
          status={ status }
          textType={ "email" }
          name="email"
          value={ formDatas.email }
          onChange={ handleChange }
        />
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
        <FormBar
          status={ status }
          textType={ "username" }
          name="username"
          value={ formDatas.username }
          onChange={ handleChange }
        />
        <label className={styles.bottomLabel}>{ status === "failure" ? "something was wrong! try again.." : "" }</label>
        <div id={styles.button} className="flex flex-wrap gap-2">
          <Button type="submit" color="alternative" pill> Submit </Button>
        </div>
      </form>
      <div className={styles.circle}>
        <button onClick={() => navigate("/")} className={styles.gobackButton}>Go Back</button>
        <button onClick={() => navigate("/login")} className={styles.signButton}>Log in</button>
      </div>
    </div>
  );
}