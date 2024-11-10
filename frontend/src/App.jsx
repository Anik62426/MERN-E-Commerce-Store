import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./pages/Auth/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar/>
      <ToastContainer />
      {/* <Navigation/> */}
      
      <main className="pb-3">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default App;
