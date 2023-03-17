import "./landingProfiles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingProfiles = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [willDelete, setWillDelete] = useState(false);
  const [counter, setCounter] = useState(0);
  const [mouse, setMouse] = useState("");

  const clickDelete = (id) => {
    try {
      let res = fetch(
        "https://dashboard-rest-api.onrender.com/api/users/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": 999,
            Host: window.location.hostname,
          },
        }
      ).then((res) => {
        props.dataTrigger(true);
        console.log("Successfully deleted profile!" + res.status);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (id) => {
    setSelected(id);
    props.selected(id);
    props.profiles(false);

    navigate("/" + id);
  };

  const profilesClassNames =
    "profiles " + (willDelete ? "delete-activated " : "");

  const holdCounter = () => {
    while (mouse === "mouseDown") {
      setInterval(() => setCounter((prev) => prev + 1), 1000);
    }
    clearInterval();
  };

  return (
    <div
      onClick={holdCounter}
      onMouseDown={() => setMouse("mouseDown")}
      onMouseUp={() => {
        setMouse("mouseUp");
      }}
    >
      <div className={profilesClassNames}>
        {props.data.map((item) => {
          return (
            <div>
              <div
                key={item.id}
                className="delete-button"
                onClick={() => clickDelete(item._id)}
              >
                x
              </div>
              <div
                key={item._id}
                className="landing-profile-container"
                onClick={() => clickHandler(item._id)}
              >
                <div className="profile-border">
                  <div className="rotating-border">
                    <div className="rotation"></div>
                  </div>
                  <div className="profile-image">
                    <img
                      src={item.profile_picture}
                      alt="Artworks by Chris Thomas on Behance - https://www.behance.net/MisterMass"
                    />
                  </div>
                </div>
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingProfiles;
