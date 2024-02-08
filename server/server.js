const express = require("express");

const bodyParser = require("body-parser");
const pool = require("./db");
const app = express();
const cors = require("cors")


// PostgreSQL connection pool (replace 'your_database_uri' with your actual PostgreSQL URI)

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors())

// POST endpoint for signing up a booth
app.post("/sign", async (req, res) => {
  try {
    const { name, date, start, end, email, phone } = req.body;

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
      "INSERT INTO booth (name, date, start_time, end_time, email, phone) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, date, start, end, email, phone]
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

app.listen("5000", () => {
  console.log(`Server is running on port ${"5000"}`);
});