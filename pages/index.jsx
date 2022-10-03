import Head from "next/head";
import styles from "../styles/home.module.scss";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import formatDate from "../utills/formatdate";
import genMAC from "../utills/genMac";

const cx = classNames.bind(styles);

export default function Home() {
  const [data, setData] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [devieIP, setDeviceIP] = useState("");
  const [power, setPower] = useState("");
  const [nameWarning, setNameWarning] = useState(false);
  const [ipWarning, setIPwarning] = useState(false);
  const [powerWarning, setPowerWarning] = useState(false);
  const [emptyPower, setEmpty] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/devices").then(res => setData(res.data));
  }, []);

  //get new device
  const getNewDevice = async e => {
    e.preventDefault();
    const numberRegex = /^\d*(\.\d+)?$/gm;

    if (deviceName && devieIP && power && power.match(numberRegex)) {
      await axios.post("http://localhost:8000/adddevice", {
        name: deviceName,
        mac: genMAC(),
        ip: devieIP,
        createdAt: Date.now(),
        power: Number(power),
      });
      //re-render
      await axios
        .get("http://localhost:8000/devices")
        .then(res => setData(res.data));
      setDeviceName("");
      setDeviceIP("");
      setPower("");
    } else {
      if (!deviceName) setNameWarning(true);
      if (!devieIP) setIPwarning(true);
      if (!power) setEmpty(true);
      if (!power.match(numberRegex)) setPowerWarning(true);
    }
  };
  //total
  function total(data) {
    let sum = 0;
    data.forEach(device => {
      sum = sum + Number(device.power);
    });
    return sum;
  }

  //chart render
  ChartJS.register(ArcElement, Tooltip, Legend);
  const defaultColor = [
    "rgb(255, 99, 132)",
    "rgb(255, 205, 86)",
    "rgb(253, 228, 0)",
    "rgb(54, 162, 235)",
    "rgb(54, 162, 189)",
    "rgb(54, 122, 189)",
    "rgb(253, 228, 22)",
    "rgb(233, 128, 0)",
    "rgb(213, 128, 233)",
    "rgb(23, 128, 233)",
    "rgb(123, 128, 123)",
    "rgb(33, 128, 33)",
    "rgb(23, 128, 33)",
    "rgb(133, 128, 133)",
    "rgb(213, 128, 200)",
  ];
  function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  const mydata = [];
  const mylabels = [];
  const mycolors = [...defaultColor];
  data.forEach(device => {
    mylabels.push(device.name);
    mydata.push(device.power);
    mycolors.push(`#${randomColor()}`);
  });

  const chartdata = {
    labels: mylabels,
    datasets: [
      {
        label: "Power Consumption",
        data: mydata,
        backgroundColor: mycolors,
        hoverOffset: 1,
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>SOIOT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cx("table-content")}>
        <table className={cx("dashboardTable")}>
          <thead>
            <tr>
              <td>Divce</td>
              <td>Mac adress</td>
              <td>IP</td>
              <td>Create Date</td>
              <td>Power consumption (kW/h)</td>
            </tr>
          </thead>
          {data.map((device, index) => (
            <tbody key={index}>
              <tr>
                <td>{device.name}</td>
                <td>{device.mac}</td>
                <td>{device.ip}</td>
                <td>{formatDate(device.createdAt)}</td>
                <td>{device.power}</td>
              </tr>
            </tbody>
          ))}
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{total(data)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className={cx("grap-content")}>
        <div className={cx("grap")}>
          <div className={cx("square")}>
            <Pie data={chartdata} title="Power Consumption" width={200} />
          </div>
        </div>
        <div className={cx("devices")}>
          <form className={cx("device")}>
            <input
              name="device"
              placeholder="name"
              value={deviceName}
              onChange={e => {
                setDeviceName(e.target.value);
                setNameWarning(false);
              }}
              required
            />
            {nameWarning && (
              <span className={cx("warning", "deviceWarning")}>
                Enter Device
              </span>
            )}
            <input
              placeholder="IP"
              value={devieIP}
              onChange={event => {
                setDeviceIP(event.target.value);
                setIPwarning(false);
              }}
              required
            />
            {ipWarning && (
              <span className={cx("warning", "ipWarning")}>
                Enter device IP
              </span>
            )}
            <input
              placeholder="Power"
              onChange={e => {
                setPower(e.target.value);
                setPowerWarning(false);
                setEmpty(false);
              }}
              value={power}
            />
            {emptyPower && (
              <span className={cx("warning", "showpower")}>Enter power</span>
            )}
            {powerWarning && (
              <span className={cx("warning", "powerWarning")}>
                Enter an number or decimal
              </span>
            )}
            <button
              type="submit"
              className={cx("adddevice-btn")}
              onClick={e => getNewDevice(e)}
            >
              ADD DEVICE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
