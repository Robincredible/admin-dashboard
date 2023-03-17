import Card from "./UI/card";
import ellipsis from "../Images/icon-ellipsis.svg";
import ContextMenu from "./Admin Components/context-menu";

import "./stats.css";
import { useState } from "react";

const Stats = (props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const timeframeSelected = props.selected.toLowerCase();

  const sanitizedTitle = (string) => {
    return string.replace(/\W+/g, "-").toLowerCase();
  };

  console.log(props.timeframes[timeframeSelected].current);

  const clickHandler = (title) => {
    if (props.active === title) {
      setActiveMenu(!activeMenu);
    }
  };

  const removeActive = () => {
    setActiveMenu(false);
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
          <ContextMenu
            className={activeMenu === true ? "active " : ""}
            items="Edit"
          />
        </div>
      </div>
      <h2 className="stat-hours">
        {props.timeframes[timeframeSelected].current}hrs
      </h2>
      <h3 className="stat-hours-prev">
        Last Week - {props.timeframes[timeframeSelected].previous} Hours
      </h3>
    </Card>
  );
};

export default Stats;
