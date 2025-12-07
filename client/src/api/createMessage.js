import api from "./axios";

const createMessage = async (roomId, content) => {
  try {
    const res = await api.post("/chat/message", {roomId, content});
    return res.data;
  } catch (err) {
    console.error("Create Message Error:", err);
    throw err;
  }
};

export default createMessage;