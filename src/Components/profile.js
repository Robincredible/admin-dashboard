import "./profile.css";
import Card from "./UI/card";
import defaultImage from "../Images/image-jeremy.png";
import { useState, useEffect } from "react";

const Profile = (props) => {
  const id = props.id;
  const [name, setName] = useState(props.name);
  const [profilePic, setProfilePic] = useState(props.image);
  const [loading, setLoading] = useState(true);
  const [willEdit, setWillEdit] = useState(false);

  const url = "https://dashboard-rest-api.onrender.com/api/users/" + id;

  let contentLength = 500;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setLoading(false);
            setName(data.name);
          });
      } catch (err) {
        console.log(err);
      }

      if (loading === true) {
        fetchData();
      }
    };
  }, [name, loading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
          "Content-Length": contentLength,
          Host: window.location.hostname,
        },
      });

      if (res.status === 200) {
        setName(name);
        setWillEdit(false);
        setLoading(true);
      } else {
        console.log("error updating " + id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="profile">
      <img
        src={props.image || defaultImage}
        alt="Artworks by Chris Thomas on Behance - https://www.behance.net/MisterMass"
      />
      <p>Report for</p>
      {!willEdit && <h1 className="name">{name}</h1>}
      {!willEdit && (
        <p className="edit-button" onClick={() => setWillEdit(!willEdit)}>
          Edit
        </p>
      )}
      <form className={willEdit ? "edit-form " : ""} onSubmit={submitHandler}>
        {willEdit && (
          <h1 className="name">
            <input
              placeholder={props.name}
              onChange={(e) => setName(e.target.value)}
            />
          </h1>
        )}
        {willEdit && <input value="Done" type="submit" />}
      </form>
    </Card>
  );
};

export default Profile;
