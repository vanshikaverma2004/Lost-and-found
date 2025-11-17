const express = require("express");
const router = express.Router();
const pool = require("../db");

// Search lost + found items
router.get("/", async (req, res) => {
  const query = req.query.q; // keyword

  if (!query || query.trim() === "") {
    return res.json([]);
  }

  try {
    // Search Lost Items
    const [lost] = await pool.query(
      `SELECT id, title, description, location, 'lost' AS type 
       FROM lost_items 
       WHERE title LIKE ? OR description LIKE ? OR location LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    // Search Found Items
    const [found] = await pool.query(
      `SELECT id, title, description, location, 'found' AS type 
       FROM found_items 
       WHERE title LIKE ? OR description LIKE ? OR location LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    // Combine results
    const results = [...lost, ...found];

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const sql = `
      SELECT id, title, description, location, created_at, 'lost' AS type
      FROM lost_items
      
      UNION ALL
      
      SELECT id, title, description, location, created_at, 'found' AS type
      FROM found_items
      
      ORDER BY created_at DESC
      LIMIT 4;
    `;

    const [rows] = await pool.query(sql);
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent queries" });
  }
});


router.get("/recent", async (req, res) => {
  try {
    const sql = `
      SELECT id, title, description, location, created_at, 'lost' AS type
      FROM lost_items
      
      UNION ALL
      
      SELECT id, title, description, location, created_at, 'found' AS type
      FROM found_items
      
      ORDER BY created_at DESC
      LIMIT 4;
    `;

    const [rows] = await pool.query(sql);
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent queries" });
  }
});


// GET MOST RECENT 4 QUERIES (lost + found combined)
router.get("/recent", async (req, res) => {
  try {
    const sql = `
      SELECT id, title, description, location, created_at, 'lost' AS type
      FROM lost_items
      
      UNION ALL
      
      SELECT id, title, description, location, created_at, 'found' AS type
      FROM found_items
      
      ORDER BY created_at DESC
      LIMIT 4;
    `;

    const [rows] = await pool.query(sql);
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent queries" });
  }
});


module.exports = router;
