import api from "./axios";

const getUserData = async () => {
  try {
    const userData = await api.get("/user/data");
    return userData.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default getUserData;