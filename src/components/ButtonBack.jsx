import { useNavigate } from "react-router";
import styles from "./Button.module.css";

function ButtonBack({ type }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      className={`${styles.btn} ${styles[type]}`}
    >
      &larr;Back
    </button>
  );
}

export default ButtonBack;
