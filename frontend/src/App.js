import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./actions/userAction";
import "./App.scss";
import Routing from "./pages/Routing";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Routing />
      <ToastContainer />
    </div>
  );
}

export default App;
