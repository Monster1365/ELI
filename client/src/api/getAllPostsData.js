import api from "./axios";

const getAllPostsData = async () => {
  try {
    const allposts = await api.get("/posts/allposts");
    return allposts.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getAllPostsData;