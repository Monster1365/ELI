import api from "./axios";

const getChatOther = async (id) => {
  try {
    const other = await api.get(`/chat/other/${id}`);
    return other.data;
  } catch (err) {
    if (!id) {
      console.log("room_id dose not exist.");
    } else console.error(err);
    return false;
  }
}

export default getChatOther;