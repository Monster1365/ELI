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
  return(
    <div className={styles.container}>
      <h1>{show.title}</h1>
    </div>
  );
}