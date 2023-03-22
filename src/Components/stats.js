import Card from "./UI/card";
import "./stats.css";
import ellipsis from "../Images/icon-ellipsis.svg";
import { useState, useEffect } from "react";
import StatsEdit from "./Admin Components/stats-edit";

const Stats = (props) => {
  const timeframeSelected = props.selected.toLowerCase();
  const [activeMenu, setActiveMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(timeframeSelected);
  const [title, setTitle] = useState(props.title);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(
    props.timeframes[timeframeSelected].current
  );
  const [previous, setPrevious] = useState(
    props.timeframes[timeframeSelected].previous
  );
  const [willEdit, setWillEdit] = useState(false);

  const sanitizedTitle = (string) => {
    return string.replace(/\W+/g, "-").toLowerCase();
  };

  const clickHandler = (title) => {
    if (props.active === title) {
      setActiveMenu(!activeMenu);
    }
  };

  const url = "https://dashboard-rest-api.onrender.com/api/users/" + props.id;
  //const url = "https://fh3en6-5000.csb.app/api/users/" + props.id;

  useEffect(() => {
    setCurrentTime(props.selected.toLowerCase());

    const fetchData = async () => {
      try {
        await fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setLoading(false);
            setCurrent(data.current);
            setPrevious(data.previous);
          });
      } catch (err) {
        console.log(err);
      }

      if (loading === true) {
        fetchData();
      }
    };
  }, [current, previous, currentTime]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const contentLength = 600;

    try {
      let res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          index: props.i,
          timeframeSelected: timeframeSelected,
          current: current,
          previous: previous,
        }),
        headers: {
          "Content-Type": "application/json",
          "Content-Length": contentLength,
          Host: window.location.hostname,
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        console.log("Updated item " + res.status.message);
      } else {
        console.log("Error updating" + res.status.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      key={props.title}
      className={"stats " + sanitizedTitle(props.title.toLowerCase())}
    >
      <div key={props.title + "-div"} className="flex-title">
        <h1 key={props.title + "-h1"} className="stat-title">
          {props.title}
        </h1>
        <div>
          <img
            key={props.title + "-img"}
            onClick={() => clickHandler(props.title)}
            className="ellipsis"
            src={ellipsis}
          />
          <StatsEdit
            className={activeMenu === true ? "active " : ""}
            edit={setWillEdit}
            active={activeMenu}
          />
        </div>
      </div>
      {!willEdit && (
        <h2 key={props.title + "-h2"} className="stat-hours">
          {current}hrs
        </h2>
      )}
      {!willEdit && (
        <h3 key={props.title + "-h3"} className="stat-hours-prev">
          Last Week - {previous} Hours
        </h3>
      )}
      {willEdit && (
        <form
          key={props.title + "-form"}
          onSubmit={submitHandler}
          id="stats-form"
          className="stats-form"
        >
          <h2 key={props.title + "-form-h2"} className="stat-hours">
            <input
              key={props.title + "-form-input"}
              maxLength="3"
              className="current"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />{" "}
            hrs
          </h2>
          <h3 key={props.title + "-form-h3"} className="stat-hours-prev">
            Last Week -
            <input
              key={props.title + "-form-input-2"}
              maxLength="3"
              className="previous"
              value={previous}
              onChange={(e) => setPrevious(e.target.value)}
            />{" "}
            Hours
          </h3>
        </form>
      )}
    </Card>
  );
};

export default Stats;
