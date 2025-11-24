import styles from "./HomeContent.module.css";
import help from "../../imgs/headerImgs/home.svg";

export default function HomeContent() {
  return(<div className={styles.contentContainer}>
    <div className={styles.topContent}>
      <div className={styles.filter}>
        <img src={help} alt="help" />
        <select name="filter" id={styles.tagFilter}>
          <option value="none" selected></option>
          <option value="tag1">tag1</option>
          <option value="tag2"></option>
          <option value="tag3"></option>
          <option value="tag4"></option>
        </select>
      </div>
      <div className={styles.searchBar}></div>
      <div className={styles.searchButton}></div>
    </div>
    <div className={styles.middleContent}></div>
    <div className={styles.bottomContent}></div>
  </div>);
}