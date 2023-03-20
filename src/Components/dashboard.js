import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";
import data from "../data.json";
import timeframesData from "../timeframes.json"; // created a test json so we can scale the items if needed and recieve json data from APIs
import Profile from "./profile";
import Stats from "./stats";
import Period from "./period";
import Loading from "./loading";

const Dashboard = (props) => {
  const filteredData = props.dataset
    ? props.dataset.filter((e) => e._id === props.selectedID)
    : null;
  const [loading, setLoading] = useState(props.status);
  const [dataSet, setDataSet] = useState(filteredData);
  const [active, setActive] = useState("");
  const [selected, setSelected] = useState("Weekly");
  const [name, setName] = useState(filteredData[0].name || dataSet[0].name);
  const [image, setImage] = useState(filteredData[0].profile_picture);
  const [id, setId] = useState(props.selectedID);

  const timeframes = ["Daily", "Weekly", "Monthly"]; //test data
  //const dataSet = props.dataset ? props.dataset : "";

  const navigate = useNavigate();

  const backHandler = () => {
    props.setStatus(true);
    props.setProfiles(true);
    props.setID("");
    navigate("/");
  };

  useEffect(() => {
    setDataSet(filteredData);
    setName(filteredData[0].name || dataSet[0].name);
    setImage(dataSet[0].profile_picture);
  }, [dataSet]);

  const mapStats = !dataSet
    ? "Loading"
    : dataSet[0].data.map((item) => {
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
      });

  return (
    <div className="dashboard-container">
      <div className="back-button" onClick={backHandler}>
        <p>Back to Profiles</p>
      </div>
      <div className="flex-display">
        <div className="profile-container">
          <Profile id={id} name={name} image={image} />
          <Period
            timeframes={timeframesData}
            selectTime={setSelected}
            selected={selected}
          />
        </div>
        <div className="stats-container grid">
          {props.status && <Loading />}
          {!props.status && mapStats}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
