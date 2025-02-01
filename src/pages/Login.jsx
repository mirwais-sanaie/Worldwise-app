import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";

export default function Login() {
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
