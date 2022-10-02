import styles from "../styles/login.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [existsUsername, setExist] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyRepassword, setEmptyRepassword] = useState(false);
  const [incorrectRepassword, setIncorectRepassword] = useState(false);

  const checkAccount = () => {};

  const createAccount = async e => {
    e.preventDefault();
    if (!password) setEmptyPassword(true);
    if (!username) setEmptyUsername(true);
    if (!repassword) setEmptyRepassword(true);
    if (repassword !== password) setIncorectRepassword(true);
    if (
      !emptyUsername &&
      !existsUsername &&
      !emptyPassword &&
      !emptyRepassword &&
      !incorrectRepassword
    ) {
      // call API
    }
  };

  return (
    <div>
      <form className={cx("signup-container")}>
        <h2 className={cx("login-title")}>Register account</h2>
        <div className={cx("input-box")}>
          <input
            className={cx("login-input", "username")}
            placeholder="username"
            value={username}
            onChange={e => {
              setUserName(e.target.value);
              setEmptyUsername(false);
            }}
            required
          />
          {emptyUsername && (
            <span className={cx("warning", "nocshow")}>
              Enter your username
            </span>
          )}
          {existsUsername && (
            <span className={cx("warning", "nocshow")}>
              Account already exists
            </span>
          )}
          <input
            className={cx("login-input", "password")}
            type="password"
            placeholder="password"
            onChange={e => {
              setPassword(e.target.value), setEmptyPassword(false);
            }}
            required
          />
          {emptyPassword && (
            <span className={cx("warning", "nocshow")}>
              Enter your password
            </span>
          )}
          <input
            className={cx("login-input", "password")}
            type="password"
            placeholder="re-enter password  "
            onChange={e => {
              setRepassword(e.target.value);
              setIncorectRepassword(false);
              setEmptyRepassword(false);
            }}
            required
          />
          {emptyRepassword && (
            <span className={cx("warning", "nocshow")}>
              Re-enter your password
            </span>
          )}
          {incorrectRepassword && (
            <span className={cx("warning", "nocshow")}>
              Re-enter password ncorrect
            </span>
          )}
        </div>
        <div className={cx("login-nav")}>
          <button className={cx("login-btn")} onClick={createAccount}>
            LOGIN
          </button>
          <button className={cx("create-btn")}>or create new acount</button>
        </div>
      </form>
    </div>
  );
}
