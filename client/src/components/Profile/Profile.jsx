
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";
import userImage from "../../imgs/homeProfile/userImage.svg";
import ModifyProfile from "../ModifyProfile";

import getUserData from "../../api/getUserData";

export default function Profile() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    image: "",
    intro: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserData();
        if (!res) {
          alert("토큰 유효시간 초과");
          return navigate("/");
        }
        setUser(res);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    getUser();
  }, [user]);

  return(
    <div className={styles.container}>
      <div className={styles.modifyProfile}>
        {isOpen && <ModifyProfile onClose={closePopup} />}
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.topImg}><img alt="img" src={user.image? `http://localhost:3001${user.image}`: userImage} /></div>
          <div className={styles.topText}>
            <label>ID: {user.id}</label>
            <label>Name: {user.username}</label>
            <label>Email: {user.email}</label>
          </div>
        </div>
        <div className={styles.middle}>
          <p><label>{user.intro? user.intro: "소개글이 없습니다."}</label></p>
          <div className={styles.bottom}>
            <button onClick={openPopup}>Modify</button>
            <button onClick={() => {navigate("/Home", {state: {content: "home"}});}} >Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}