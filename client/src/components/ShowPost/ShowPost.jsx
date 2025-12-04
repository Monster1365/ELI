import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import createChatRoom from "../../api/createChatRoom";
import getUserData from "../../api/getUserData"

import styles from "./ShowPost.module.css";

export default function ShowPost({data}) {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    id: "",
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
  
  const show = {
    id: data.id,
    author_id: data.author_id,
    title: data.title,
    content: data.content,
    thumbnail: data.thumbnail,
    status_: data.status,
    is_sold: data.is_sold,
    price: data.price,
    tags: data.tags,
    created_at: data.created_at,
  };
  const date = new Date(show.created_at);
  show.created_at = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`

  function getPrice(price) {
    let result = price.toLocaleString();
    result = result.replace(/ /g,"");
    return result;
  }

  async function createChat() {
    const room = await createChatRoom(user.id, show.author_id);
    console.log(room);
    navigate("/Home", {state: {content: "chat"}});
  }

  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.first}>
          <img src={`http://localhost:3001${show.thumbnail}`} alt="thumbnail" />
          <div className={styles.firstRight}>
            <div className={styles.bar}>
              <label>Seller: {show.author_id}</label>
            </div>
            <div className={styles.bar}>
              <label>Title: {show.title}</label>
            </div>
            <div className={styles.bar}>
              <label id={styles.priceValue}>Price: {getPrice(show.price)}</label>
            </div>
            <div className={styles.bar}>
              <label>state: {show.is_sold === 0? "판매중": "판매완료"}</label>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.second}>
            <pre>{show.content}</pre>
          </div>
          <div className={styles.third}>
            <button onClick={createChat} id={styles.chatBtn}>Chat</button>
            <label>Tags {show.tags}</label>
            <label id={styles.date}>Date {show.created_at}</label>
          </div>
        </div>
      </div>
    </div>
  );
}