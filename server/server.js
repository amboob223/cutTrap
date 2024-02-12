const express = require("express");

const bodyParser = require("body-parser");
const pool = require("./db");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Oia2ME02fj2AjRfCm6lH09HloiDztl2Qm0Qf4VjvAORMYCR38bs4qvXZbWs8fjYXfdVMur8D1Jf8ZMupnZ4A2wU00hzkAXUBT");
const dotenv = require("dotenv").config();
const path = require("path");

// PostgreSQL connection pool (replace 'your_database_uri' with your actual PostgreSQL URI)

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors())



const storeItems = new Map([
    [ 1, {priceInCents:5000, name:"Booth space"}],
    
]) 
// POST endpoint for signing up a booth
app.post("/sign", async (req, res) => {
  try {
    const { name, date, start, end, email, phone,price } = req.body;

    // Check for overlapping sessions with a minimum gap of 15 minutes
    const overlappingSessions = await pool.query(
      "SELECT * FROM booth WHERE date = $1 AND ((start_time <= $2 AND end_time >= $2 - interval '15 minutes') OR (start_time <= $3 + interval '15 minutes' AND end_time >= $3))",
      [date, start, end]
    );

    if (overlappingSessions.rows.length > 0) {
      return res.status(400).json({ message: "Time slot is already booked or overlaps with an existing session." });
    }

    // Insert a new booth record into the database
    await pool.query(
      "INSERT INTO booth (name, date, start_time, end_time, email, phone,price) VALUES ($1, $2, $3, $4, $5, $6,$7)",
      [name, date, start, end, email, phone,price]
    );

    // Send a success response
    res.status(201).json({ message: "Booth booked successfully!" });
  } catch (error) {
    console.error("Error booking booth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to check for time conflicts
app.get("/sign", async (req, res) => {
  try {
    const { date, start, end } = req.query;

    // Check for any booths booked at the specified date and time range
    const result = await pool.query(
      "SELECT * FROM booth WHERE date = $1 AND ((start_time <= $2 AND end_time >= $2) OR (start_time <= $3 AND end_time >= $3))",
      [date, start, end]
    );

    const conflicts = result.rows.length > 0;

    res.json({ conflicts });
  } catch (error) {
    console.error("Error checking time conflicts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/owner", async (req, res) => {
  try {
    const { date } = req.query;

    // Fetch all booths booked on the specified date
    const result = await pool.query("SELECT * FROM booth WHERE date = $1", [date]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching booth data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// DELETE endpoint for owner to delete a booking by ID
app.delete("/owner/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the booth entry with the specified ID
    await pool.query("DELETE FROM booth WHERE id = $1", [id]);

    res.json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booth data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map(item => {
      const storeItem = storeItems.get(item.id);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cancel.html",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen("5000", () => {
  console.log(`Server is running on port ${"5000"}`);
});