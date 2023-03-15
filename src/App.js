import "./styles.css";
import Dashboard from "./Components/dashboard";
import Loading from "./Components/loading";
import { useState, useEffect } from "react";
import LandingProfiles from "./Components/landingProfiles";

export default function App() {
  const [dataset, setDataset] = useState("");
  const [loading, setLoading] = useState(true);
  const [profilesLanding, setProfilesLanding] = useState(true);
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  //const [id, setId] = useState("6410273cb39f3d8572f1d9c3");
  //const [id, setId] = useState("64100e7cb39f3d8572f1d9c0");
  //const [id, setId] = useState("64102672b39f3d8572f1d9c2");

  useEffect(() => {
    const url = "https://dashboard-rest-api.onrender.com/api/users/" + id;

    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setLoading(false);
            setDataset(data);
          });
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading && <Loading />}
      {!loading && profilesLanding && (
        <LandingProfiles
          data={dataset}
          selected={setId}
          profiles={setProfilesLanding}
        />
      )}
      {!loading && !profilesLanding && (
        <Dashboard dataset={dataset} selectedID={id} status={loading} />
      )}
    </div>
  );
}
