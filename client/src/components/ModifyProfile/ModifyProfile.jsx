import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./ModifyProfile.module.css";

import getUserData from "../../api/getUserData";
import updateUserProfile from "../../api/updateUserProfile";

export default function ModifyProfile() {
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
  };

  return(
    <div className={styles.box}>
      <form
        id="profileForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
          <input
            type="text"
            name="username"
            placeholder="제목을 입력하세요..."
            value={user.username}
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
          />
          <input
            type="email"
            name="email"
            placeholder="제목을 입력하세요..."
            value={user.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="text"
            name="intro"
            placeholder="제목을 입력하세요..."
            value={user.intro}
            onChange={(e) => setUser((prev) => ({ ...prev, intro: e.target.value }))}
          />
          <input
            id={styles.img}
            type="file"
            accept="image/*"
            onChange={(e) => setUser((prev) => ({ ...prev, image: e.target.files[0] }))}
          />
          <button type="submit" form="profileForm">
            수정
          </button>
      </form>
    </div>
  )
}