import styles from"./Header.module.css";
import home from "../../imgs/headerImgs/home.svg";
import chat from "../../imgs/headerImgs/chat.svg";
import profile from "../../imgs/headerImgs/profile.svg";
import help from "../../imgs/headerImgs/help.svg";
import setting from "../../imgs/headerImgs/setting.svg";

export default function Header() {
  return (<header>
    <div className={ styles.headerFrame }>
      <div className={styles.box} id={styles.home}>
        <img src={home} alt="home" />
        <label>Home</label>
      </div>
      <div className={styles.box} id={styles.chat}>
        <img src={chat} alt="chat" />
        <label>Chat</label>
      </div>
      <div className={styles.box} id={styles.profile}>
        <img src={profile} alt="profile" />
        <label>Profile</label>
      </div>
      <div className={styles.box} id={styles.help}>
        <img src={help} alt="help" />
        <label>Help</label>
      </div>
      <div className={styles.box} id={styles.setting}>
        <img src={setting} alt="setting" />
        <label>Setting</label>
      </div>
    </div>
  </header>);
}