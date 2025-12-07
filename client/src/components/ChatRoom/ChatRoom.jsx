import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getAllMessage from "../../api/getAllMessage";
import createMessage from "../../api/createMessage";
import getChatOther from "../../api/getChatOther";
import getUserData from "../../api/getUserData";

import Message from "../Message";
import styles from "./ChatRoom.module.css";

export default function ChatRoom({roomId}) {
  const navigate = useNavigate();
  const [messages, setMessage] = useState([]);
  const [content, setContent] = useState("");
  const [other, setOther] = useState({
    id: "",
    username: "",
    image: "",
  });
  const [user, setUser] = useState({
    id: "",
    username: "",
    image: "",
  });
  
  const getChatMessages = async () => {
    const result = await getAllMessage(roomId);
    if (result) setMessage(result);
    setContent("");
  }
  const getOther = async () => {
    const result = await getChatOther(roomId);
    setOther(result);
  }
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
  }

  const msgPosition = (msg) => {
    if (msg.sender_id === user.id) {
      return <Message
          className={styles.userMsg}
          position={"right"}
          msg={msg}
          name={user.username}
          image={user.image}
        />
    } else {
      return <Message
          className={styles.otherMsg}
          position={"left"}
          msg={msg}
          name={other.username}
          image={other.image}
        />
    }
  };

  useEffect(() => {
    getChatMessages();
    getOther();
    getUser();
    const eventSource = new EventSource(`http://localhost:3001/chat/stream/${roomId}`);

    eventSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessage(prev => [...prev, msg]);
    };

    return () => {
      eventSource.close();
    };
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return alert("내용을 입력하세요.");
    createMessage(roomId, content);
  };

  return(
    <div className={styles.myBody}>
      <div className={styles.rightTop}>
        <div id={styles.topName}>{other.username}</div>
        <div id={styles.topSelect}>
          select
        </div>
      </div>
      <div className={styles.rightMiddle}>
        {messages? messages.map(msg => <div className={styles.msgBar}>{msgPosition(msg)}</div>): <div></div>}
      </div>
      <div className={styles.rightBottom}>
        <div className={styles.sendContract}>
          <button>test</button>
        </div>
        <form
          id="sendForm"
          onSubmit={handleSubmit}
          className={styles.sendMessage}
        >
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} />
          <button onClick={getChatMessages} id={styles.sendBtn} type="submit" form="sendForm">
            send
          </button>
        </form>
      </div>
    </div>
  )
}