import "./landingProfiles.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LandingProfiles = (props) => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (id) => {
    setSelected(id);
    props.selected(id);
    props.profiles(false);

    navigate("/" + id);
  };

  return (
    <div>
      <div className="profiles">
        {props.data.map((item) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default LandingProfiles;
