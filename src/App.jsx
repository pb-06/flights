/** TODO - dev team collaboration powered by Git */
/** branch deployment promote chain: prod=main <- uat <- dev/flights <- dev/flights-firstname-lastname */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Destinations from "./pages/Destinations";
import FlightInfo from "./pages/FlightInfo";
import Tickets from "./pages/Tickets";
import NavbarMenu from "./components/NavbarMenu";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="container text-center mt-5"><h3>Betöltés...</h3></div>;
  }

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      {loggedIn && <NavbarMenu onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/destinations" /> : <Login onLogin={() => setLoggedIn(true)} />} />

        {loggedIn ? (
          <>
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/flight-info" element={<FlightInfo />} />
            <Route path="/tickets" element={<Tickets />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
