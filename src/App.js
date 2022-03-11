import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Home from "./Home/Home";
import HotelApi from "./api/api";
import Routes from "./routes/Routes";
import './CSS/App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Routes/>
      </div>
    </BrowserRouter>
  )
}

export default App;
