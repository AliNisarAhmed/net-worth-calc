import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import { FormStateContextProvider } from "./context/FormStateContext";
import CurrencySelector from "./components/CurrencySelector";
import NetWorth from "./components/NetWorth";
import Layout from "./components/layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppStateContext";

function App() {
  return (
    <Layout>
      <FormStateContextProvider>
        <AppContextProvider>
          <ToastContainer
            autoClose={5000}
            position="bottom-right"
            hideProgressBar={true}
            closeOnClick={true}
          />
          <h1 className="text-3xl mb-2 text-center">Tracking your Net Worth</h1>
          <CurrencySelector />
          <NetWorth />
          <Assets />
          <Liabilities />
        </AppContextProvider>
      </FormStateContextProvider>
    </Layout>
  );
}

export default App;
