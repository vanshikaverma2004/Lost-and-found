const pool = require("../db");

// GET all found items
exports.getFoundItems = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM found_items WHERE claimed = FALSE ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch found items" });
  }
};

// GET found item by ID
exports.getFoundItemById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM found_items WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// ADD found item
exports.addFoundItem = async (req, res) => {
  const { title, description, location, date_found, phone } = req.body;

  try {
    await pool.query(
      "INSERT INTO found_items (title, description, location, date_found, phone) VALUES (?, ?, ?, ?, ?)",
      [title, description, location, date_found, phone]
    );

    res.json({ message: "Found item added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add found item" });
  }
};

// ✔ NEW: MARK FOUND ITEM AS CLAIMED
exports.markFoundItemClaimed = async (req, res) => {
  try {
    await pool.query(
      "UPDATE found_items SET claimed = 1 WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "Item marked as claimed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
};
