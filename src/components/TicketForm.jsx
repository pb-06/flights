import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function TicketForm({ onSubmit }) {
    const [form, setForm] = useState({ name: "", from: "", to: "", date: "" });

    const handleFormSubmit = e => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: "", from: "", to: "", date: "" });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Control placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mb-2" />
            <Form.Control placeholder="From" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className="mb-2" />
            <Form.Control placeholder="To" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className="mb-2" />
            <Form.Control type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mb-2" />
            <Button type="submit">Add to Basket</Button>
        </Form>
    );
}