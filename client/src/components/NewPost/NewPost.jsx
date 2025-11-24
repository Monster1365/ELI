import styles from "./NewPost.module.css";
import { useNavigate } from "react-router-dom";

export default function Newpost() {
  const navigate = useNavigate();
  return(<div className={styles.container}>
    <div className={styles.containerHead}>
      <button onClick={() => {navigate("/Home", {state: {content: "home"}})}} id={styles.back} >나가기</button>
      <button id={styles.show} >미리보기</button>
      <button id={styles.post} >게시하기</button>
    </div>
    <div className={styles.containerBody}>
      <div className={styles.bodyTitle}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요..."
          required
        />
      </div>
      <div className={styles.bodyThumbnail}>
        <label>Thumbnail</label>
        <input
          type="file"
          accept="image/*"
        />
      </div>
      <div className={styles.bodyContent}>
        <textarea
          rows="6"
          cols="22"
          placeholder="내용을 입력하세요..."
        ></textarea>
      </div>
    </div>
  </div>);
}