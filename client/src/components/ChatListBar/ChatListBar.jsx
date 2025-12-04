import { useState, useEffect } from "react";

import getChatOther from "../../api/getChatOther";

import styles from "./ChatListBar.module.css";
import nullImage from '../../imgs/homeProfile/userImage.svg';

export default function ChatListBar({id}) {
  const [other, setOther] = useState({
    username: "",
    image: "",
  });
  useEffect(() => {
    const getOther = async () => {
      const result = await getChatOther(id);
      setOther(result);
    }
    getOther();
  }, []);

  return(
    <div className={styles.listBar}>
      <div className={styles.otherImg}>
        <img src={other.image? `http://localhost:3001${other.image}`: nullImage} alt="img" />
      </div>
      <div className={styles.otherName}>
        {other.username}
      </div>
    </div>
  );
}