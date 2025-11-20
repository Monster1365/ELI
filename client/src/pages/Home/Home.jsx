import styles from "./Home.module.css"
import HomeSidebar from "../../components/HomeSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div className={ styles.layout }>
      <Header />
      <HomeSidebar />
      <Footer />
    </div>
  );
}