import { NavLink,Link } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from './Logo'
function NavigatePage() {
  return (
    <nav className={styles.nav}>
      <Logo/>
      <ul>
        <li>
          {/* <a href="/product">product</a> */}{/* this works but it makes a lot of requests by refreshing the page - see from Network => Name */}
          {/* <Link to="/product">product</Link> its important to put / here */}
          <NavLink to="/">Home</NavLink> 
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink> {/* NavLink is the same as Link but it has one more attribute it shows class="active" in Element in the browser not here  we can use it for CSS */}
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>  {/* its important to put / here  */}
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>Login</NavLink> {/* NavLink is the same as Link but it has one more attribute it shows class="active" in Element in the browser not here  we can use it for CSS */}
        </li>
      </ul>
    </nav>
  );
}

export default NavigatePage;
