import styles from "./PostBox.module.css";

export default function PostBox({title, price, imgURL, onClick}) {
  const post = {
    title: title,
    price: price,
    imgURL: imgURL,
  }

  function getPrice(price) {
    let result = price.toLocaleString();
    result = result.replace(/ /g,"");
    return result;
  }

  return (
    <div className={styles.box} onClick={onClick}>
      <div className={styles.thumbnail}>
        <img alt="img" src={`http://localhost:3001${post.imgURL}`} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <label id={styles.titleText}>
            {post.title}
          </label>
        </div>
        <div className={styles.price}>
          <label id={styles.priceText}>Price: </label>
          <label id={styles.priceValue}>
            {getPrice(post.price)}
          </label>
        </div>
      </div>
    </div>
  );
}