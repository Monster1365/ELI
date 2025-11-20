import styles from "./Home.module.css"
import HomeSidebar from "../../components/HomeSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import getUserProfile from "../../api/getUserProfile";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
  const checkAuth = async () => {
    try {
      await getUserProfile(); // 토큰 유효하면 통과
    } catch {
      localStorage.removeItem("token");
      navigate("/"); // 로그인 페이지로 강제 이동
    }
  };
  checkAuth();
}, []);

  return (
    <div className={ styles.layout }>
      <Header />
      <HomeSidebar />
      <Footer />
    </div>
  );
}