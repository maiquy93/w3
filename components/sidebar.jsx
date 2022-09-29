import styles from "../styles/sidebar.module.scss";
import classNames from "classnames/bind";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCameraRetro,
  faChartSimple,
  faHourglassEnd,
  faGear,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
config.autoAddCss = false;

const cx = classNames.bind(styles);

export default function Sidebar() {
  const sidebar = useRef();

  const sidebarShow = () => {
    const ss = document.getElementById("nav");
    console.log(sidebar.current);
    ss.style.left = "0";
    sidebar.current.classList.add("nav-show");
  };

  return (
    <>
      <label htmlFor="check" className={cx("checkbtn")}>
        <FontAwesomeIcon icon={faBars} onClick={sidebarShow} />
      </label>
      <nav className={cx("nav-container")} ref={sidebar} id="nav">
        <div className={cx("userbox-backup")}>
          <FontAwesomeIcon icon={faCircleUser} />
          <span id="welcometop">Welcome John</span>
        </div>
        <div className={cx("logo")}>
          <FontAwesomeIcon icon={faCameraRetro} className={cx("icon")} />
          <label className={cx("logo-title")}>Device Manager</label>
        </div>
        <ul className={cx("nav-list")}>
          <li>
            <FontAwesomeIcon icon={faChartSimple} className={cx("icon")} />
            <a data-active="dashboard" className={cx("option")}>
              Dashboard
            </a>
          </li>
          <li>
            <FontAwesomeIcon icon={faHourglassEnd} className={cx("icon")} />
            <a data-active="logs" className={cx("option", "logs")}>
              Logs
            </a>
          </li>
          <li id="setting" className={cx("setting1")}>
            <FontAwesomeIcon icon={faGear} className={cx("icon")} />
            <a data-active="setting" className={cx("option")}>
              Setting
            </a>
            <ul className={cx("extend")} id="extend">
              <li className={cx("logout")}>
                <button className={cx("logout-btn")}>Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
