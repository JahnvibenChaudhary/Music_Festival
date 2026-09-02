const express = require("express");

const {
    authenticateToken,
    requireRole
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET customer-only resource
router.get(
    "/customer",
    authenticateToken,
    requireRole("customer"),
    (req, res) => {
        res.status(200).json({
            message: "Customer-only resource accessed successfully"
        });
    }
);

module.exports = router;