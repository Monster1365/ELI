import api from "./axios";

const createChatRoom = async (myId, otherId) => {
  try {
    const res = await api.post("/chat/room", {myId, otherId});
    return res.data;
  } catch (err) {
    console.error("Create Chatroom Error:", err);
    throw err;
  }
};

export default createChatRoom;