const express = require("express");

const { getAllFestivals } = require("../controllers/festivalController");

const router = express.Router();

// GET all festivals
router.get("/", getAllFestivals);

module.exports = router;