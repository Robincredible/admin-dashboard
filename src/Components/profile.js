import "./profile.css";
import Card from "./UI/card";
import defaultImage from "../Images/image-jeremy.png";

const Profile = (props) => {
  return (
    <Card className="profile">
      <img src={props.image || defaultImage} />
      <p>Report for</p>
      <h1 className="name">{props.name}</h1>
    </Card>
  );
};

export default Profile;
