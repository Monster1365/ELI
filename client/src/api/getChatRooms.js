import api from "./axios";

const getChatRooms = async () => {
  try {
    const res = await api.get("/Chat/room");
    const ids = res.data.map(r => r.room_id);
    return ids;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getChatRooms;