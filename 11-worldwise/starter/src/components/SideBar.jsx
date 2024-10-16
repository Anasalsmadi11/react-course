import Logo from "../components/Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import { Outlet } from "react-router-dom";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet /> {/* this is an element: it displays the content of the children Route (in App.jsx) */}
      <Footer />
    </div>
  );
}

export default SideBar;
