
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";


const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
   const backendUrl="http:localhost:4000"
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="add" element={<Add url={backendUrl} />} />
          <Route path="list" element={<List url={backendUrl} />} />
          <Route path="orders" element={<Orders url={backendUrl} />} />
        </Route>
      </Routes>
    
  );
};

export default App;
