import styles from "./NewPost.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import uploadNewPost from "../../api/uploadNewPost";
import getUserData from "../../api/getUserData";

export default function Newpost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: ""
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

    if (!title) return alert("제목을 입력하세요.");
    if (!content) return alert("내용을 입력하세요.");
    if (!price) return alert("가격을 입력하세요.");

    const formData = new FormData();
    formData.append("author_id", user.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("tag", tag);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const result = await uploadNewPost(formData);
      console.log("업로드 결과:", result);
      navigate("/Home", {state: {content: "home"}})
    } catch (err) {
      alert("업로드 실패");
    }
  };

  return(
    <div className={styles.container}>
      <div className={styles.containerHead}>
        <button
          onClick={() => {
            navigate("/Home", { state: { content: "home" } });
          }}
          id={styles.back}
        >
          나가기
        </button>
        <button id={styles.show}>미리보기</button>
        <button id={styles.post} type="submit" form="postForm">
          게시하기
        </button>
      </div>

      <form
        id="postForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.containerBody}
      >
        <div className={styles.bodyFirst}>
          <div className={styles.bodyTitle}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.bodyPrice}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.bodySecond}>
          <div className={styles.bodyThumbnail}>
            <label>Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <div className={styles.bodyTag}>
            <label>Tag</label>
            <input
              type="text"
              name="tag"
              placeholder="태그를 입력하세요..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.bodyContent}>
          <textarea
            rows="6"
            cols="22"
            placeholder="내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}