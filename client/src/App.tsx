import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import { AppContextProvider } from "./context/AppContext";
import CurrencySelector from "./components/CurrencySelector";
import NetWorth from "./components/NetWorth";
import Layout from "./components/layout/MainLayout";

function App() {
  return (
    <Layout>
      <AppContextProvider>
        <h1 className="text-3xl mb-2 text-center">Tracking your Net Worth</h1>
        <CurrencySelector />
        <NetWorth />
        <Assets />
        <Liabilities />
      </AppContextProvider>
    </Layout>
  );
}

export default App;
