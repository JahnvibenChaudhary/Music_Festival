const express = require("express");

const {
    getAllFestivals,
    getFestivalDetails,
    createFestivalController,
    updateFestivalController,
    deleteFestivalController
} = require("../controllers/festivalController");

const {
    authenticateToken,
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET all festivals
router.get("/", getAllFestivals);

// GET festival details by ID
router.get("/:id", getFestivalDetails);

// POST create festival - administrator only
router.post(
    "/",
    authenticateToken,
    requireRole("administrator"),
    createFestivalController
);

// PUT update festival - administrator only
router.put(
    "/:id",
    authenticateToken,
    requireRole("administrator"),
    updateFestivalController
);

// DELETE festival - administrator only
router.delete(
    "/:id",
    authenticateToken,
    requireRole("administrator"),
    deleteFestivalController
);

module.exports = router;