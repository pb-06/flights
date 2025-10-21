import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import DestinationCard from "../components/DestinationCard";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Destinations() {
  const [cities, setCities] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cities"));
        const citiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCities(citiesData);
      } catch (error) {
        console.error("Hiba a városok lekérdezése közben: ", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Form.Control
        type="text"
        placeholder="Filter by city or country..."
        className="mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <Row>
        {filteredCities.map((city) => (
          <Col md={4} key={city.id}>
            <DestinationCard city={city} />
          </Col>
        ))}
      </Row>
    </div>
  );
}