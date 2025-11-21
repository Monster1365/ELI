import api from "./axios";

const getUserData = async () => {
  try {
    const userData = await api.get("/user/data");
    console.log("client api getUserData: ", userData.data);
    return userData.data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default getUserData;