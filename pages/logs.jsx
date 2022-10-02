import styles from "../styles/logs.module.scss";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import formatDate from "../utills/formatdate";

const cx = classNames.bind(styles);

export default function logs() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const defautlData = useRef();

  let sortAsc = false;
  const pageSize = 12;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/logs?limit=12&page=${page}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        setData(res.data);
        defautlData.current = res.data;
      });
  }, [page]);

  //sort
  function sort(e) {
    let thisSort = e.target.dataset.sort;
    if (sortCol === thisSort) sortAsc = !sortAsc;
    sortCol = thisSort;
    console.log("sort dir is ", sortAsc);
    const sort = data.sort((a, b) => {
      if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
      if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    });
    setData(sort);
  }

  function previousPage() {
    if (curPage > 1) setCurPage(prev => prev - 1);
  }
  function nextPage() {
    if (curPage * pageSize < data.length) setCurPage(prev => prev + 1);
  }

  async function findByName() {
    if (searchValue) {
      const result = await axios.get(
        `http://localhost:8000/devicesearch?name=${searchValue}`
      );
      setData(result.data);
      setCurPage(1);
    }
    if (searchValue == "") {
      setData(defautlData.current);
      setCurPage(1);
    }
  }

  return (
    <div className={cx("content")}>
      <div className={cx("log-header")}>
        <h3 className={cx("logs-title")}>Action logs</h3>
        <div className={cx("search-box")}>
          <input
            placeholder="name"
            className={cx("search-input")}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyUp={findByName}
          />
          <button className={cx("search-btn")}>Search</button>
        </div>
      </div>
      <div className={cx("logs-content")}>
        <table id="catTable" className={cx("logs-table")}>
          <thead>
            <tr className={cx("line-head")}>
              <th data-sort="id">DeviceID#</th>
              <th data-sort="name">Name</th>
              <th data-sort="action">Action</th>
              <th data-sort="date">Date</th>
            </tr>
          </thead>

          <tbody>
            {data
              .filter((row, index) => {
                let start = (curPage - 1) * pageSize;
                let end = curPage * pageSize;
                if (index >= start && index < end) return true;
              })
              .map((c, index) => {
                return (
                  <tr className={cx("line")} key={index}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.action}</td>
                    <td>{formatDate(c.createdAt)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className={cx("nav")}>
        <button onClick={previousPage}>prev</button>
        <button onClick={nextPage}>next</button>
      </div>
    </div>
  );
}
