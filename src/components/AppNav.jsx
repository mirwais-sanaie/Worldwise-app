import { NavLink } from "react-router";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"countries"}>Countries</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
