const express = require("express");

const {
    getAllFestivals,
    getFestivalDetails
} = require("../controllers/festivalController");

const router = express.Router();

// GET all festivals
router.get("/", getAllFestivals);

// GET festival details by ID
router.get("/:id", getFestivalDetails);

module.exports = router;