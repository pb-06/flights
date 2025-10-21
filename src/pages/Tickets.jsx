import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import TicketForm from "../components/TicketForm";

export default function Tickets() {
  const [basket, setBasket] = useState([]);

  const handleAddTicket = newTicket => {
    setBasket([...basket, newTicket]);
  };

  return (
    <div className="container">
      <h3>Book a Ticket</h3>
      <TicketForm onSubmit={handleAddTicket} />

      <h4 className="mt-4">Your Basket</h4>
      <ListGroup>
        {basket.map((b, i) => (
          <ListGroup.Item key={i}>{`${b.name} : ${b.from} → ${b.to} on ${b.date}`}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}