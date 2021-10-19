import React, { useEffect, useState } from "react";
import * as API from "./api";
import "./App.css";
import { data } from "./data";
import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <h1>Tracking your Net Worth</h1>
        <div>
          <p>Select Currency: CAD</p>
        </div>
        <div>
          <p>Net Worth: 1212130.00</p>
        </div>
        <Assets assets={data.assets} />
        <Liabilities liabilities={data.liabilities} />
      </AppContextProvider>
    </div>
  );
}

export default App;
