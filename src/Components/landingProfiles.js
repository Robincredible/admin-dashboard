import "./landingProfiles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLongPress from "./newLongPress";

const LandingProfiles = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [willDelete, setWillDelete] = useState(false);
  const [mouse, setMouse] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(data);
  }, [data]);

  const backspaceLongPress = useLongPress(
    () => setWillDelete(!willDelete),
    1000
  );

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
        console.log("Successfully deleted profile! Status:" + res.status);
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

  //console.log(data);

  return (
    <div
      onMouseDown={() => setMouse("mouseDown")}
      onMouseUp={() => {
        setMouse("mouseUp");
      }}
      onMouseMove={() => setMouse("mouseUp")}
      onTouchCancel={() => setMouse("mouseUp")}
      onTouchMove={() => setMouse("mouseUp")}
      onTouchStart={() => setMouse("mouseDown")}
      onTouchEnd={() => {
        setMouse("mouseUp");
      }}
      {...backspaceLongPress}
    >
      <div className={profilesClassNames}>
        {data.map((item) => {
          return (
            <div key={item._id + "-container"}>
              <div
                key={item._id + "-delete"}
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
                <div
                  className="profile-border"
                  key={item._id + "-profile-border"}
                >
                  <div
                    className="rotating-border"
                    key={item._id + "-rotating-border"}
                  >
                    <div
                      className="rotation"
                      key={item._id + "-rotation"}
                    ></div>
                  </div>
                  <div
                    className="profile-image"
                    key={item._id + "-profile-image"}
                  >
                    <img
                      key={item._id + "-image"}
                      src={item.profile_picture}
                      alt="Artworks by Chris Thomas on Behance - https://www.behance.net/MisterMass"
                    />
                  </div>
                </div>
                <p key={item._id + "-name"}>{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingProfiles;
