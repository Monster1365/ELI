import styles from "./Message.module.css";
import nullImage from '../../imgs/homeProfile/userImage.svg';

export default function Message({className, position, msg, name, image}) {
  const date = new Date(msg.created_at);
  const createdAt = `${date.getHours()}:${date.getMinutes()}`

  const showMessage = () => {
    if (position === "left") {
      return(
        <div className={styles.leftBox}>
          <div className={styles.info}>
            <div className={styles.infoImage}>
              <img src={image? `http://localhost:3001${image}`: nullImage} alt="img" />
            </div>
            <div className={styles.infoUsername}>
              {name}
            </div>
          </div>
          <div className={styles.msgMain}>
            <pre className={styles.msgContent}>{msg.content}</pre>
            <p className={styles.msgDate}>{createdAt}</p>
          </div>
        </div>
      );
    } else {
      return(
        <div className={styles.rightBox}>
          <div className={styles.info}>
            <div className={styles.infoImage}>
              <img src={image? `http://localhost:3001${image}`: nullImage} alt="img" />
            </div>
            <div className={styles.infoUsername}>
              나
            </div>
          </div>
          <div className={styles.msgMain}>
            <p className={styles.msgDate}>{createdAt}</p>
            <pre className={styles.msgContent}>{msg.content}</pre>
          </div>
        </div>
      );
    }
  };

  return(
    <div className={className}>
      {msg? showMessage(): <div>메시지 오류</div>}
    </div>
  );
}