import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Home.module.css"
import HomeSidebar from "../../components/HomeSidebar";
import HomeContent from "../../components/HomeContent";
import MyPosts from "../../components/MyPosts";
import NewPost from "../../components/NewPost";
import ShowPost from "../../components/ShowPost";
import Profile from "../../components/Profile";
import Chat from "../../components/Chat";

import getUserProfile from "../../api/getUserProfile";

const components = {
  home: HomeContent,
  profile: Profile,
  myPosts: MyPosts,
  newPost: NewPost,
  showPost: ShowPost,
  chat: Chat,
}

export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const CurrentComponent = components[state.content];
  const data = state.data;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const success = await getUserProfile();
        if (success) navigate("/Home", {state: {content: "home"}}); else {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
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
          <CurrentComponent data={data} />
        </div>
        <Footer />
      </div>
    </div>
  );
}