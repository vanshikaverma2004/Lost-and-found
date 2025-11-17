require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// import route
const lostRoutes = require("./routes/lost");
app.use("/api/lost-items", lostRoutes);
const foundRoutes = require("./routes/found");
app.use("/api/found-items", foundRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const searchRoutes = require("./routes/search");
app.use("/api/search", searchRoutes);


const pool = require("./db");

// TEST DB ROUTE
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);   // <-- SHOW REAL ERROR
    res.status(500).json({ error: error.message });
  }
});


// Default route
app.get("/", (req, res) => {
  res.send("Express server is running ✔");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





