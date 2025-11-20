import api from "./axios";

const login = async (id, password) => {
  try {
    const res = await api.post("/auth/login",
      { 
        id: id,
        password: password
      });
    localStorage.setItem("token", res.data.token);
    return true;
  } catch (err) {
    const msg = err.response?.data?.message;

    if (msg) {
      alert(msg);
    } else {
      alert("로그인 중 오류가 발생했습니다.");
    }

    return false;
  }
}

export default login;