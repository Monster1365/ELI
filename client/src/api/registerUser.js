import api from "./axios";

const register = async (formDatas) => {
  const { email, id, password, username } = formDatas;
  try {
    const res = await api.post("/auth/sign",
      { 
        email: email,
        id: id,
        password: password,
        username: username,
      });
    console.log("status: ", res);
    return true;
  } catch (err) {
    const msg = err.response?.data?.message;

    if (msg) {
      alert(msg);
    } else {
      alert("회원가입 중 오류가 발생했습니다.");
    }

    return false;
  }
}

export default register;