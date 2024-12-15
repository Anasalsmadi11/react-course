import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>{" "}
          {/* when you add / in the beginning react considers it as absolute path and replaces it with the existing path, but when you don't put it in the beginning react considers it as relative path and gets added on top of  the current path*/}
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
