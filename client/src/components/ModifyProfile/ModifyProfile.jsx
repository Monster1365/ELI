import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./ModifyProfile.module.css";

import getUserData from "../../api/getUserData";
import updateUserProfile from "../../api/updateUserProfile";

export default function ModifyProfile({ onClose }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("intro", user.intro);
    if (user.image) {
      formData.append("image", user.image);
    }

    try {
      const result = await updateUserProfile(formData);
      navigate("/Home", {state: {content: "profile"}})
    } catch (err) {
      alert("변경 실패");
    }
    onClose();
  };

  return(
    <div className={styles.box}>
      <form
        className={styles.myForm}
        id="profileForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
          <label className={styles.myLabel}>New Name</label>
          <input
            className={styles.myInput}
            type="text"
            name="username"
            placeholder="새 이름을 입력하세요..."
            value={user.username}
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
          />
          <label className={styles.myLabel}>New Email</label>
          <input
            className={styles.myInput}
            type="email"
            name="email"
            placeholder="새 이메일을 입력하세요..."
            value={user.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          />
          <label className={styles.myLabel}>New Intro</label>
          <input
            className={styles.myInput}
            type="text"
            name="intro"
            placeholder="소개글을 입력하세요..."
            value={user.intro}
            onChange={(e) => setUser((prev) => ({ ...prev, intro: e.target.value }))}
          />
          <label className={styles.myLabel}>New Profile image</label>
          <input
            className={styles.myInput}
            id={styles.img}
            type="file"
            accept="image/*"
            onChange={(e) => setUser((prev) => ({ ...prev, image: e.target.files[0] }))}
          />
          <div>
            <button id={styles.button1} type="submit" form="profileForm">
              수정
            </button>
            <button onClick={onClose} id={styles.button2}>
              취소
            </button>
          </div>
      </form>
    </div>
  )
}