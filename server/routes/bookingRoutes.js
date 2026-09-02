const express = require("express");

const { getAllBookings } = require("../controllers/bookingController");

const {
    authenticateToken,
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET all bookings - administrator only
router.get(
    "/",
    authenticateToken,
    requireRole("administrator"),
    getAllBookings
);

module.exports = router;