import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

import ChatListBar from "../ChatListBar";
import ChatRoom from "../ChatRoom/ChatRoom";

import getChatRooms from "../../api/getChatRooms";
import styles from "./Chat.module.css";

export default function Chat() {
  const [roomIds, setRoomIds] = useState([]);
  const [roomId, setRoomId] = useState(0);
  
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
        {roomIds.map(id => <div className={styles.list} onClick={()=> setRoomId(id)}><ChatListBar id={id} /></div>)}
        
      </div>
      <div className={styles.right}>
        {roomId? <ChatRoom roomId={roomId} />: <div></div>}
      </div>
    </div>
  );
}