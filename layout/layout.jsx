import styles from "../styles/layout.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import React from "react";
import Sidebar from "../components/sidebar";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

function Layout({ children }) {
  const route = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const currentRoute = route.pathname;

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage?.getItem("isLogin")) || false);
    setCurrentUser(JSON.parse(localStorage?.getItem("currentUser")) || null);
  }, []);

  const isLoginPage = currentRoute === "/login";

  const sidebar = useRef();
  const sidebarShow = () => {
    sidebar.current.style.left = "0";
  };

  const hideSidebar = () => {
    sidebar.current.style.left = "-100%";
  };

  if (currentRoute === "/signup") return <Signup />;

  if (!isLogin)
    return (
      <div>
        <Head>
          <title>{"next-app"}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main>
          <Login />
        </main>
      </div>
    );

  return (
    <div className={cx("root")}>
      <Head>
        <title>{"next-app"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={cx("wrapper", { isLoginPage })}>
        {!isLoginPage && (
          <label htmlFor="check" className={cx("checkbtn")}>
            <FontAwesomeIcon icon={faBars} onClick={sidebarShow} />
          </label>
        )}
        {
          <div className={cx("sidebar", { isLoginPage })} ref={sidebar}>
            <Sidebar />
          </div>
        }
        <div className={cx("content-container")} onClick={hideSidebar}>
          {!isLoginPage && (
            <div className={cx("header")}>
              <div className={cx("user-box")}>
                <FontAwesomeIcon icon={faCircleUser} />
                <span id="welcome" className={cx("username")}>
                  {`Welcome ${currentUser.username}`}
                </span>
              </div>
            </div>
          )}
          {
            <div className={cx("content")}>
              <main>{children}</main>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Layout;
