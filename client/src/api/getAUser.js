import api from "./axios";

const getUser = async (id) => {
  try {
    const user = await api.get(`/user/${id}`);
    return user.data;
  } catch (err) {
    console.error(err);
    return false
  }
}

export default getUser;
