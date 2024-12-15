import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css"; // command csm will import the styles vid: 211
import User from "../components/User";
import { useAuth } from "../contexts/FakeAuth";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
