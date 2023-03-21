import Card from "./UI/card";
import "./stats.css";
import ellipsis from "../Images/icon-ellipsis.svg";
import ContextMenu from "./Admin Components/context-menu";
import { useState } from "react";
import StatsEdit from "./Admin Components/stats-edit";

const Stats = (props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const timeframeSelected = props.selected.toLowerCase();
  const [title, setTitle] = useState(props.title);
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

  const submitHandler = async (e) => {
    e.preventDefault();

    alert("Cannot update this stat for now 😢");

    const contentLength = 600;

    let data = [
      {
        title: props.active,
        timeframes: {
          timeframeSelected: { current: current, previous: previous },
        },
      },
    ];

    // try {
    //   let res = await fetch(url, {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       data: data,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Content-Length": contentLength,
    //       Host: window.location.hostname,
    //     },
    //   });

    //   if (res.status === 200) {
    //     console.log("Updated item " + props.active + " for " + props.id);
    //   } else {
    //     console.log("Error updating " + props.active + " for " + props.id);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Card className={"stats " + sanitizedTitle(props.title.toLowerCase())}>
      <div className="flex-title">
        <h1 className="stat-title">{props.title}</h1>
        <div>
          <img
            onClick={() => clickHandler(props.title)}
            className="ellipsis"
            src={ellipsis}
          />
          <StatsEdit
            form="stats-form"
            className={activeMenu === true ? "active " : ""}
            edit={setWillEdit}
          />
        </div>
      </div>
      {!willEdit && (
        <h2 className="stat-hours">
          {props.timeframes[timeframeSelected].current}hrs
        </h2>
      )}
      {!willEdit && (
        <h3 className="stat-hours-prev">
          Last Week - {props.timeframes[timeframeSelected].previous} Hours
        </h3>
      )}
      {willEdit && (
        <form onSubmit={submitHandler} id="stats-form" className="stats-form">
          <h2 className="stat-hours">
            <input
              maxLength="3"
              className="current"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />{" "}
            hrs
          </h2>
          <h3 className="stat-hours-prev">
            Last Week -
            <input
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
