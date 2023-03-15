import "./landingProfiles.css";
import { useEffect, useState } from 'react';

const LandingProfiles = (props) => {
    const [selected, setSelected] = useState("");
    
    const clickHandler = (id) => {
        setSelected(id);
        props.selected(id);
        props.profiles(false);
    }
    
    return (
        <div className="profiles">
            {props.data.map(item => {
                return (
                <div key={item._id} className="profile-container" onClick={() => clickHandler(item._id)}>
                    <div className="profile-image">
                        <img src={item.profile_picture} />
                    </div>
                    <p>{item.name}</p>
                </div>
              )}
            )}
        </div>
    )
}

export default LandingProfiles;