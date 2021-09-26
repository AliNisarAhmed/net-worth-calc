import React, { useEffect, useState } from "react";
import * as API from "./api";
import "./App.css";
import { LocationWithTimezone } from "./types";

function App() {
  const [timezones, setTimezones] = useState<LocationWithTimezone[]>([]);

  useEffect(() => {
    fetchdata();

    async function fetchdata() {
      const tz = await API.fetchTimezones();
      setTimezones(tz);
    }
  }, []);

  return (
    <div className="App">
      <h1>Timezones</h1>
      <div>
        {timezones.map((tz) => (
          <div key={tz.timezoneName}>
            <h3>Location: {tz.location}</h3>
            <p>
              Timezone Name: {tz.timezoneName} - {tz.timezoneAbbr}
            </p>
            <p>UTC Offset: {tz.utcOffset}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
