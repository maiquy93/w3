import styles from "../styles/login.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [existsUsername, setExist] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [incorrectPassword, setIncorectLength] = useState(false);
  const [emptyRepassword, setEmptyRepassword] = useState(false);
  const [incorrectRepassword, setIncorectRepassword] = useState(false);

  const checkAccount = async () => {
    const res = await axios.post("http://localhost:8000/checkacc", {
      username: username,
    });
    if (!res.data) setExist(true);
  };

  const createAccount = async e => {
    e.preventDefault();
    if (!password) setEmptyPassword(true);
    if (!username) setEmptyUsername(true);
    if (!repassword) setEmptyRepassword(true);
    if (repassword !== password) setIncorectRepassword(true);
    if (
      username &&
      !existsUsername &&
      password.length >= 6 &&
      repassword === password
    ) {
      const response = await axios.post("http://localhost:8000/createnewacc", {
        username: username,
        password: password,
      });
      console.log(response.data);
      if (response.data == true) {
        alert("Your account has been created");
        window.location.href = "/login";
      }
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
              setExist(false);
            }}
            onBlur={checkAccount}
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
              setIncorectLength(false);
            }}
            onBlur={() => {
              if (password.length < 6) setIncorectLength(true);
            }}
          />
          {emptyPassword && (
            <span className={cx("warning", "nocshow")}>
              Enter your password
            </span>
          )}
          {incorrectPassword && (
            <span className={cx("warning", "nocshow")}>
              Password at least 6 character
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
          />
          {emptyRepassword && (
            <span className={cx("warning", "nocshow")}>
              Re-enter your password
            </span>
          )}
          {incorrectRepassword && (
            <span className={cx("warning", "nocshow")}>
              Re-enter password incorrect
            </span>
          )}
        </div>
        <div className={cx("login-nav")}>
          <button className={cx("login-btn")} onClick={e => createAccount(e)}>
            Create
          </button>
          <button
            className={cx("create-btn", "cancel")}
            onClick={e => {
              e.preventDefault();
              window.location.href = "/login";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
