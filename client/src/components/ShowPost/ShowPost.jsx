import styles from "./ShowPost.module.css";

export default function ShowPost({data}) {
  const show = {
    id: data.id,
    author_id: data.author_id,
    title: data.title,
    content: data.content,
    thumbnail: data.thumbnail,
    status_: data.status,
    is_sold: data.is_sold,
    price: data.price,
    tags: data.tags,
    created_at: data.created_at,
  };
  const date = new Date(show.created_at);
  show.created_at = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.first}>
          <img src={`http://localhost:3001${show.thumbnail}`} alt="thumbnail" />
          <div className={styles.firstRight}>
            <div className={styles.bar}>
              <label>Seller: {show.author_id}</label>
            </div>
            <div className={styles.bar}>
              <label>Title: {show.title}</label>
            </div>
            <div className={styles.bar}>
              <label id={styles.priceValue}>Price: {show.price}</label>
            </div>
            <div className={styles.bar}>
              <label>state: {show.is_sold === 0? "판매중": "판매완료"}</label>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.second}>
            <p>{show.content}</p>
          </div>
          <div className={styles.third}>
              <label>Tags {show.tags}</label>
              <label id={styles.date}>Date {show.created_at}</label>
            </div>
        </div>
        </div>
    </div>
  );
}