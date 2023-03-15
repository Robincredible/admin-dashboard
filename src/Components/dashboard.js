import { useEffect, useState } from "react";

import "./dashboard.css";
import data from "../data.json";
import timeframesData from "../timeframes.json"; // created a test json so we can scale the items if needed and recieve json data from APIs
import Profile from "./profile";
import Stats from "./stats";
import Period from "./period";

const Dashboard = (props) => {
  const [active, setActive] = useState("");
  const [selected, setSelected] = useState("Weekly");
  const [name, setName] = useState(props.dataset.name);

  const timeframes = ["Daily", "Weekly", "Monthly"]; //test data
  const [dataSet, setDataSet] = useState(props.dataset);
  //const dataSet = props.dataset ? props.dataset : "";

  useEffect(() => {
    setDataSet(props.dataset);
    setName(dataSet.name);
  }, [dataSet]);

  return (
    <div className="flex-display">
      <div className="profile-container">
        <Profile name={name} />
        <Period
          timeframes={timeframesData}
          selectTime={setSelected}
          selected={selected}
        />
      </div>
      <div className="stats-container grid">
        {dataSet.data.map((item) => {
          return (
            <div
              key={item.title}
              onMouseEnter={() => {
                setActive(item.title);
              }}
              onMouseLeave={() => {
                setActive("");
              }}
            >
              <Stats
                title={item.title}
                timeframes={item.timeframes}
                selected={selected}
                key={item.title}
                active={active}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
