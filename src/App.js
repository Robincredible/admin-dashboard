import "./styles.css";
import Dashboard from "./Components/dashboard";
import { useState, useEffect } from "react";

export default function App() {
  const [dataset, setDataset] = useState("");

  const [id, setId] = useState(1);

  useEffect(() => {
    const url = "http://localhost:5000/api/users/" + id;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setDataset(json);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, []);

  return (
    <div className="App">
      <Dashboard dataset={dataset} />
    </div>
  );
}
