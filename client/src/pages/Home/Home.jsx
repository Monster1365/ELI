import styles from "./Home.module.css"
import HomeSidebar from "../../components/HomeSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import getUserProfile from "../../api/getUserProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const success = await getUserProfile();
        if (!success) navigate("/");
      } catch (err) {
        // localStorage.removeItem("token");
        navigate("/"); // 로그인 페이지로 강제 이동
      }
    };
    checkAuth();
  }, []);

  return (
    <div className={styles.layout}>
      <HomeSidebar />
      <div className={styles.right}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.contentContainer}>
            <div className={styles.topContent}></div>
            <div className={styles.middleContent}></div>
            <div className={styles.bottomContent}></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}