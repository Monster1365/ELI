import api from "./axios";

const getPostsData = async () => {
  try {
    const myposts = await api.get("/posts/myposts");
    return myposts.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getPostsData;