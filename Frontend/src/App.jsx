import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Auth } from "./Pages/Auth/Auth";
import { Homepage } from "./Pages/Homepages/Homepage";
import { AdminDashboard } from "./Pages/AdminPanel/AdminDashboard";


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
        </Routes>
      </BrowserRouter>
    </div>
  );

} 


export default App;
