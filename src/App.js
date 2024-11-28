import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./components/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FavouritesScreen from "./pages/Favourite";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourite" element={<FavouritesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
