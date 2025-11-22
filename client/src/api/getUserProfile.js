import api from "./axios";

const getUserProfile = async () => {
  try {
    const profile = await api.get("/user/profile");
    return profile.data;
  } catch (err) {
    console.error(err);
    return false
  }
}

export default getUserProfile;
