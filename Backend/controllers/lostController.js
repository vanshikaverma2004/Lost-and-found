const pool = require("../db");

// Get all lost items
exports.getLostItems = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM lost_items WHERE claimed = FALSE ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lost items" });
  }
};

// Get single lost item
exports.getLostItemById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM lost_items WHERE id = ?", 
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// Create lost item
exports.createLostItem = async (req, res) => {
  try {
    const { title, description, location, phone, name, date_lost } = req.body;

    const [result] = await pool.query(
      "INSERT INTO lost_items (title, description, location, phone, reporter_name, date_lost) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, location, phone, name, date_lost]
    );

    res.json({ message: "Lost item added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create lost item" });
  }
};

// Mark lost item as claimed
exports.markLostItemClaimed = async (req, res) => {
  try {
    const itemId = req.params.id;

    const [result] = await pool.query(
      "UPDATE lost_items SET claimed = TRUE WHERE id = ?",
      [itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item marked as claimed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};
