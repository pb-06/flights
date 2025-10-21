import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import DestinationCard from "../components/DestinationCard";

const cities = [
  { name: "Paris", country: "France", image: "TODO-add-static-img-url-paris.jpg" },
  { name: "Tokyo", country: "Japan", image: "TODO-add-static-img-url-tokyo.jpg" },
  { name: "New York", country: "USA", image: "TODO-add-static-img-url-newyork.jpg" },
  { name: "TODO", country: "GET", image: "cities-from-backend.jpg" },
];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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
        {filteredCities.map((city, idx) => (
          <Col md={4} key={idx}>
            <DestinationCard city={city} />
          </Col>
        ))}
      </Row>
    </div>
  );
}