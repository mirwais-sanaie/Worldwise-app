import { useEffect } from "react";
import styles from "./Notification.module.css";

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.notification}>{message}</div>;
}
export default Notification;
