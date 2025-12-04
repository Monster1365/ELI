import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

import ChatListBar from "../ChatListBar";

import getChatRooms from "../../api/getChatRooms";
import styles from "./Chat.module.css";

export default function Chat() {
  const [roomIds, setRoomIds] = useState([]);
  useEffect(() => {
    const getChatRoomsId = async () => {
      const ids = await getChatRooms();
      setRoomIds(ids);
    }
    getChatRoomsId();
  }, []);
  
  return(
    <div className={styles.myBody}>
      <div className={styles.left}>
        {roomIds.map(id => <ChatListBar id={id} />)}
        
      </div>
      <div className={styles.right}>
        <p>chat room</p>
        <p>chat id</p>
        <p>chat message</p>
      </div>
    </div>
  );
}