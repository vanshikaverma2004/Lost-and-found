const express = require("express");
const router = express.Router();

const {
  getFoundItems,
  addFoundItem,
  getFoundItemById,
  markFoundItemClaimed
} = require("../controllers/foundcontroller");

// Routes
router.get("/", getFoundItems);
router.post("/", addFoundItem);
router.get("/:id", getFoundItemById);

// NEW: mark claimed
router.patch("/:id/claim", markFoundItemClaimed);

module.exports = router;
