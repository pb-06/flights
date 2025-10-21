import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import DestinationCard from "../components/DestinationCard";

const cities = [
  { name: "Paris", country: "France", image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1471" },
  { name: "Tokyo", country: "Japan", image: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470" },
  { name: "New York", country: "USA", image: "https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470" },
  // { name: "TODO", country: "GET", image: "cities-from-backend.jpg" },
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