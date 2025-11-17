const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { 
  getLostItems, 
  createLostItem, 
  getLostItemById,
  markLostItemClaimed,
} = require("../controllers/lostController");

// Get all lost items
router.get("/", getLostItems);

// Get single lost item by ID  <-- this is the new line!
router.get("/:id", getLostItemById);

// Create lost item
router.post("/", auth, createLostItem);

// Mark lost item as claimed
router.patch("/:id/claim",  markLostItemClaimed);

module.exports = router;
