import api from "./axios";

const getUserProfile = async () => {
  try {
    const profile = await api.get("/user/profile");
    console.log(profile.data);
    return profile.data;
  } catch (err) {
    console.error(err);
    return {inputStatus: "failure"};
  }
}

export default getUserProfile;
