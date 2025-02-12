import styles from "./PageNav.module.css";
import Logo from "../components/Logo";
import { NavLink } from "react-router";
import { useAuthContext } from "../contexts/AuthContextPro";
import { useState } from "react";
import Notification from "./Notification";

function PageNav() {
  const { isAuthenticated, logout } = useAuthContext();
  const [showNotification, setShowNotification] = useState(false); //

  function handleLogNav() {
    if (isAuthenticated) {
      logout();
      setShowNotification(true);
    }
  }

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink
            to={isAuthenticated ? "" : "/login"}
            onClick={() => handleLogNav()}
            className={styles.ctaLink}
          >
            {isAuthenticated ? "logOut" : "Login"}
          </NavLink>
        </li>
      </ul>
      {showNotification && (
        <Notification
          message="You have successfully logged out."
          onClose={() => setShowNotification(false)}
        />
      )}
    </nav>
  );
}

export default PageNav;
