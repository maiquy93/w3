import Head from "next/head";
import styles from "../styles/login.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const data = axios.get("http://localhost:3000/api/devices");
    console.log(data);
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      if (username && password) {
        const res = await axios.post("http://localhost:3000/api/admin", {
          username: username,
          password: password,
        });
        if (res.data.login) {
        } else {
          setWarning(true);
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <Head>
        <title>SOIOT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className={cx("form-container")}>
        <h2 className={cx("login-title")}>SOIOT SYSTEM</h2>
        <div className={cx("input-box")}>
          <input
            className={cx("login-input", "username")}
            placeholder="username"
            value={username}
            onChange={e => {
              setUserName(e.target.value);
              setWarning(false);
            }}
            required
          />
          <input
            className={cx("login-input", "password")}
            type="password"
            placeholder="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setWarning(false);
            }}
            required
          />
          {warning && (
            <span className={cx("warning", "nocshow")}>
              Incorrect account or password
            </span>
          )}
        </div>
        <div className={cx("login-nav")}>
          <button
            className={cx("login-btn")}
            onClick={event => handleLogin(event)}
          >
            LOGIN
          </button>
          <button className={cx("create-btn")}>or create new acount</button>
        </div>
      </form>
    </div>
  );
}
