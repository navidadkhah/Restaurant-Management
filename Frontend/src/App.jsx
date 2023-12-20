import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./Pages/Auth/Auth";
import { Homepage } from "./Pages/Homepages/Homepage";
import { AdminDashboard } from "./Pages/AdminPanel/AdminDashboard";
import { AdminLogin } from "./Pages/AdminPanel/AdminLogin";
import { RestaurantAdminLogin } from "./Pages/RestaurantAdminPanel/RestaurantAdminLogin";


function App() {
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
          <Route path="/web-admin" element={<AdminLogin />}></Route>
          <Route path="/restaurant-admin" element={<RestaurantAdminLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
