import Router from "./router";
import "./styles/layout.css";
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="content"><Router /></div>
      <Footer />
    </div>);
}

export default App;
