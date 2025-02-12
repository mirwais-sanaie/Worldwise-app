import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContextPro";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("qwerty");
  const { login, logout, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app");
      }
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button onClick={() => logout()} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
