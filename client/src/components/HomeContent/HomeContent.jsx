import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./HomeContent.module.css";
import tag from "../../imgs/homContentImgs/tag.svg";
import search from "../../imgs/homContentImgs/search.svg";
import PostBox from "../PostBox"
import getAllPostsData from "../../api/getAllPostsData"

export default function HomeContent() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await getAllPostsData();
        if (!res) {
          alert("토큰 유효시간 초과");
          return navigate("/");
        }
        setPosts(res);
      } catch (err) {
        console.error("포스트 정보 불러오기 실패:", err);
      }
    };
    getAllPosts();
  }, []);

  return(<div className={styles.contentContainer}>
    <div className={styles.topContent}>
      <div className={styles.filter}>
        <img src={tag} alt="tag" />
        <input type="text" />
      </div>
      <div className={styles.searchBar}>
        <label>Search</label>
        <input type="search" />
      </div>
      <button className={styles.searchButton}>
        <img src={search} alt="tag" />
      </button>
    </div>
    <div className={styles.middleContent}>
      {[...posts].reverse().map(post => (
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
  </div>);
}