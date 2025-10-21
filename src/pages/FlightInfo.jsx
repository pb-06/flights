import React, { useState, useEffect } from "react";
import FlightTable from "../components/FlightTable";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FlightInfo() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flights"));
        const flightsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlights(flightsData);
      } catch (error) {
        console.error("Hiba a járatok lekérdezése közben: ", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="container">
      <h3>Available Flights</h3>
      <FlightTable flights={flights} />
    </div>
  );
}