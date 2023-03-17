import "./landingProfiles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLongPress from "../useLongPress";

const LandingProfiles = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  // const [longPressCount, setlongPressCount] = useState(0);
  const [willDelete, setWillDelete] = useState(false);

  // /* Long Press Hook from https://stackoverflow.com/questions/48048957/react-long-press-event */
  // const onLongPress = () => {
  //   console.log("longpress is triggered");
  //   setlongPressCount(longPressCount + 1);
  // };

  // const onClick = (event) => {
  //   console.log("click is triggered " + event.target.id);
  //   let id = event.target.id;

  //   setSelected(id);
  //   props.selected(id);
  //   props.profiles(false);

  //   navigate("/" + id);
  //   // setClickCount(clickCount + 1);
  // };

  // const defaultOptions = {
  //   shouldPreventDefault: true,
  //   delay: 1000,
  // };
  // const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  // /* End of long press hook */

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

  // useEffect(() => {
  //   if (longPressCount > 0) {
  //     setWillDelete(!willDelete);
  //   }
  // }, [longPressCount]);

  const clickHandler = (id) => {
    setSelected(id);
    props.selected(id);
    props.profiles(false);

    navigate("/" + id);
  };

  const profilesClassNames =
    "profiles " + (willDelete ? "delete-activated " : "");

  return (
    <div>
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
