import { useNavigate } from "react-router";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("form");
  }
  return (
    <div onClick={handleClick} className={styles.mapContainer}>
      <h1>This is map</h1>
    </div>
  );
}

export default Map;
