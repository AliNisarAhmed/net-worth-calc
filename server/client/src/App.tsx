import Assets from "./components/Assets";
import { FormStateContextProvider } from "./context/FormStateContext";
import CurrencySelector from "./components/CurrencySelector";
import NetWorth from "./components/NetWorth";
import Layout from "./components/layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppStateContext";
import Header from "./components/Header";
import { lazy, Suspense } from "react";

const Footer = lazy(() => import("./components/Footer"));
const Liabilities = lazy(() => import("./components/Liabilities"));

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
              <Suspense fallback={<p>Loading...</p>}>
                <Liabilities />
              </Suspense>
            </form>
          </AppContextProvider>
        </FormStateContextProvider>
      </Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
