import Card from "./UI/card";
import "./stats.css";
import ellipsis from "../Images/icon-ellipsis.svg";
import { useState, useEffect, useCallback } from "react";
import StatsEdit from "./Admin Components/stats-edit";

const Stats = (props) => {
  const timeframeSelected = props.selected.toLowerCase();
  const [activeMenu, setActiveMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(currentEdit);
  const [previous, setPrevious] = useState(previousEdit);
  const [currentEdit, setCurrentEdit] = useState(
    props.timeframes[timeframeSelected].current
  );
  const [previousEdit, setPreviousEdit] = useState(
    props.timeframes[timeframeSelected].previous
  );
  const [willEdit, setWillEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  // const handleSubmit = useCallback(() => {
  //   console.log("triggered handleSubmit");
  // }, []);

  useEffect(() => {
    console.log(
      "props: " +
        props.timeframes[timeframeSelected].current +
        " :::: current state: " +
        current
    );
    //setCurrentTime(props.selected.toLowerCase());
    setCurrent(props.timeframes[timeframeSelected].current);
    setPrevious(props.timeframes[timeframeSelected].previous);
    // setCurrentEdit(current);
    // setPreviousEdit(previous);

    // if (props.onSelect === true && props.selected !== timeframeSelected) {
    //   setCurrentEdit(props.timeframes[timeframeSelected].current);
    //   setPreviousEdit(props.timeframes[timeframeSelected].previous);
    // }

    const submitHandler = async () => {
      //e.preventDefault();

      console.log("LET'S GOOO " + currentEdit);

      const contentLength = 600;

      try {
        let res = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            index: props.i,
            timeframeSelected: timeframeSelected,
            current: currentEdit,
            previous: previousEdit,
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

    if (submitted === true) {
      submitHandler();
    }

    if (props.onSelect === true) {
      setActiveMenu(false);
      setWillEdit(false);
    }

    const fetchData = async () => {
      try {
        await fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
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
  }, [props.selected, submitted]);

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
            editing={willEdit}
            onSelect={props.onSelect}
            id={props.id}
            submitOutside={setSubmitted}
          />
        </div>
      </div>
      {!willEdit && (
        <h2 key={props.title + "-h2"} className="stat-hours">
          {submitted ? currentEdit : current}hrs
        </h2>
      )}
      {!willEdit && (
        <h3 key={props.title + "-h3"} className="stat-hours-prev">
          Last Week - {submitted ? previousEdit : previous} Hours
        </h3>
      )}
      {willEdit && (
        <form
          key={props.id + "-" + props.title + "-form"}
          onSubmit={() => submitHandler()}
          id="stats-form"
          className="stats-form"
        >
          <h2 key={props.title + "-form-h2"} className="stat-hours">
            <input
              name="current"
              key={props.title + "-form-input"}
              maxLength="3"
              className="current"
              value={currentEdit}
              onChange={(e) => setCurrentEdit(e.target.value)}
            />{" "}
            hrs
          </h2>
          <h3 key={props.title + "-form-h3"} className="stat-hours-prev">
            Last Week -
            <input
              name="previous"
              key={props.title + "-form-input-2"}
              maxLength="3"
              className="previous"
              value={previousEdit}
              onChange={(e) => setPreviousEdit(e.target.value)}
            />{" "}
            Hours
          </h3>
        </form>
      )}
    </Card>
  );
};

export default Stats;
