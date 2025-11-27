import api from "./axios";

const updateUserProfile = async (formData) => {
  try {
    const res = await api.put("/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Update User Profile Error:", err);
    throw err;
  }
};

export default updateUserProfile;