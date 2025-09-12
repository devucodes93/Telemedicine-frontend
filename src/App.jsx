import React from "react";
import "./input.css";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import Me from "./components/Me";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess"

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Me />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

      </Routes>
    </div>
  );
};

export default App;
