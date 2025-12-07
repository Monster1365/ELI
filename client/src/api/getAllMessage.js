import api from "./axios";

const getAllMessage = async (roomId) => {
  try {
    if (!roomId) return false;
    const messages = await api.get(`/chat/message/${roomId}`);
    if (!messages) return false;
    return messages.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getAllMessage;