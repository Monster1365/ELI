import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./MyPosts.module.css";
import PostBox from "../PostBox";
import getPostsData from "../../api/getPostsData";

export default function MyPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getPostsData();
        if (!res) {
          alert("토큰 유효시간 초과");
          return navigate("/");
        }
        setPosts(res);
      } catch (err) {
        console.error("포스트 정보 불러오기 실패:", err);
      }
    };
    getPosts();
  }, []);

  return(
    <div className={styles.container}>
      <div className={styles.containerHead}>
        <button onClick={() => setIsNew(true)} id={styles.button1}>New</button>
        <button onClick={() => setIsNew(false)} id={styles.button2}>Old</button>
      </div>
      <div className={styles.containerBody}>
        {isNew? [...posts].reverse().map(post => (
          <PostBox
            key={post.id}
            title={post.title}
            price={post.price}
            imgURL={post.thumbnail}
            onClick={() => {
              navigate("/Home", {
                state: {
                  content: "showPost",
                  data: post,
                }
              })
            }}
          />
        )):
        posts.map(post => (
          <PostBox
            key={post.id}
            title={post.title}
            price={post.price}
            imgURL={post.thumbnail}
            onClick={() => {
              navigate("/Home", {
                state: {
                  content: "showPost",
                  data: post,
                }
              })
            }}
          />
        ))}
      </div>
    </div>
  );
}