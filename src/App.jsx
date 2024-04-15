import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Validate from "./components/Validate";
import Currencies from "./components/Currencies";
import Convert from "./components/Convert";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/currencies"
          element={
            <>
              <Header />
              <Currencies />
            </>
          }
        />
        <Route
          path="/validate"
          element={
            <>
              <Header />
              <Validate />
            </>
          }
        />
        <Route
          path="/convert-fiat"
          element={
            <>
              <Header />
              <Convert type="fiat" />
            </>
          }
        />
        <Route
          path="/convert-crypto"
          element={
            <>
              <Header />
              <Convert type="crypto" />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
