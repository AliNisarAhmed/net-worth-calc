import "./App.css";
import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import { AppContextProvider } from "./context/AppContext";
import CurrencySelector from "./components/CurrencySelector";
import NetWorth from "./components/NetWorth";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <h1>Tracking your Net Worth</h1>
        <CurrencySelector />
        <NetWorth />
        <Assets />
        <Liabilities />
      </AppContextProvider>
    </div>
  );
}

export default App;
