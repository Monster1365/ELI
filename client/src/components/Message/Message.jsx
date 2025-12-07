import styles from "./Message.module.css";
import nullImage from '../../imgs/homeProfile/userImage.svg';

export default function Message({className, position, msg, name, image}) {
  const showMessage = () => {
    if (position === "left") {
      return(
        <div className={styles.box}>
          <div className={styles.info}>
            <div className={styles.infoImage}>
              <img src={image? `http://localhost:3001${image}`: nullImage} alt="img" />
            </div>
            <div className={styles.infoUsername}>
              {name}
            </div>
          </div>
          <div className={styles.msgContent}>
            {msg.content}
          </div>
        </div>
        // <div>{name} | {msg.content}</div>
      );
    } else {
      return(
        <div>{msg.content} | {name}</div>
      );
    }
  };

  return(
    <div className={className}>
      {msg? showMessage(): <div>메시지 오류</div>}
    </div>
  );
}