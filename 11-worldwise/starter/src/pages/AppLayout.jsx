import SideBar from "../components/SideBar"
import Map from "../components/Map"
import styles from './AppLayout.module.css'  // command csm will import the styles vid: 211
function AppLayout() {
    return (
        <div className={styles.app}>
            <SideBar/>
            <Map/>
        </div>
    )
}

export default AppLayout
