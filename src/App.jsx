import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./component/Navbar";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Service from "./pages/Service";
import Testing from "./pages/Testing";
import CartoonDetail from "./pages/CartoonDetail";
import SearchHistory from "./pages/SearchHistory";
import Favourite from "./pages/Fovourite";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:name" element={<CartoonDetail />} />
        <Route path="/search-history" element={<SearchHistory />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </>
  );
}

export default App;
