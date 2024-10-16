import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'
function AppNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                <NavLink to="cities">cities</NavLink> {/* just in nested Routes don't put "/" before path in NavLink or Route because react router put it by default*/}
                </li>
                <li>
                <NavLink to="countries">countries</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav
