import Head from "next/head";
import styles from "../styles/home.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div>
      <Head>
        <title>SOIOT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("content-container")}>
          <div className={cx("header")}>
            <div className={cx("user-box")}>
              <FontAwesomeIcon icon={faCircleUser} />
              <span id="welcome" className={cx("username")}>
                Welcome John
              </span>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("table-content")}>
              <table className="dashboardTable">
                <tr></tr>
              </table>
            </div>
            <div className={cx("grap-content")}>
              <div className={cx("grap")}>
                <canvas id="mychart"></canvas>
              </div>
              <div className={cx("devices")}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
