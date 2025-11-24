import api from "./axios";

const uploadNewPost = async (formData) => {
  try {
    const res = await api.post("/posts/new", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Upload Post Error:", err);
    throw err;
  }
};

export default uploadNewPost;