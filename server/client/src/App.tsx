import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import { FormStateContextProvider } from "./context/FormStateContext";
import CurrencySelector from "./components/CurrencySelector";
import NetWorth from "./components/NetWorth";
import Layout from "./components/layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppStateContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <FormStateContextProvider>
          <AppContextProvider>
            <ToastContainer
              autoClose={5000}
              position="bottom-right"
              hideProgressBar={true}
              closeOnClick={true}
              limit={3}
              role="alert"
            />
            <CurrencySelector />
            <form>
              <NetWorth />
              <Assets />
              <Liabilities />
            </form>
          </AppContextProvider>
        </FormStateContextProvider>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
