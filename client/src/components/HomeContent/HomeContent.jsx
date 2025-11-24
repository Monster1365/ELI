import styles from "./HomeContent.module.css";
import tag from "../../imgs/homContentImgs/tag.svg";
import search from "../../imgs/homContentImgs/search.svg";

export default function HomeContent() {
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
    <div className={styles.middleContent}></div>
    <div className={styles.bottomContent}></div>
  </div>);
}