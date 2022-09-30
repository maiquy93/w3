import styles from "../styles/sidebar.module.scss";
import classNames from "classnames/bind";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faChartSimple,
  faHourglassEnd,
  faGear,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

export default function Sidebar() {
  const option = useRef();
  const router = useRouter();
  const currentRoute = router.pathname;

  const showOption = () => {
    option.current.style.display = "block";
  };
  return (
    <>
      <nav className={cx("nav-container")} id="nav">
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
            <Link href="/">
              <a
                data-active="dashboard"
                className={cx("option", { active: currentRoute === "/" })}
              >
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faHourglassEnd} className={cx("icon")} />
            <Link href="/logs">
              <a
                data-active="logs"
                className={cx("option", "logs", {
                  active: currentRoute === "/logs",
                })}
              >
                Logs
              </a>
            </Link>
          </li>
          <li id="setting" className={cx("setting")} onFocus={showOption}>
            <FontAwesomeIcon icon={faGear} className={cx("icon")} />
            <a data-active="setting" className={cx("option")}>
              Setting
            </a>
            <ul className={cx("extend")} id="extend" ref={option}>
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
