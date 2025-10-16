"use client";
import React, { useState } from "react";

export default function SponsorFormPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate submit and show a thank-you message.
    setSubmitted(true);
    console.log("Sponsor form submitted:", form);
  };

  if (submitted) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Thanks for your interest!</h1>
        <p>We've received your request and will get back to you soon.</p>
      </main>
    );
  }

  // Layout similar to the attached design: wide centered form with stacked labels/inputs
  return (
    <main
      style={{
        padding: "2.5rem 3rem",
        background: "#1A2233",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 15 }}>
          <label
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 20,
              color: "#488db4",
            }}
          >
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            style={{
              width: "60%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #488db4",
              background: "#1c1c1c",
              boxSizing: "border-box",
              fontSize: 16,
              color: "#488db4",
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 20,
              color: "#488db4",
            }}
          >
            Company Name
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Enter Your Company Name"
            style={{
              width: "60%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #488db4",
              background: "#1c1c1c",
              boxSizing: "border-box",
              fontSize: 16,
              color: "#488db4",
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 20,
              color: "#488db4",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="team_tejas@sfit.ac.in"
            style={{
              width: "60%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #488db4",
              background: "#1c1c1c",
              boxSizing: "border-box",
              fontSize: 16,
              color: "#488db4",
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 20,
              color: "#488db4",
            }}
          >
            Contact Number
          </label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="1234-567-890"
            style={{
              width: "60%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #488db4",
              background: "#1c1c1c",
              boxSizing: "border-box",
              fontSize: 16,
              color: "#488db4",
            }}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          <button type="submit" className="sponsor-button">
            Sponsor Us
          </button>
        </div>
      </form>
    </main>
  );
}
