const express = require("express");

const router = express.Router();

const {
    registerCustomer,
    loginCustomer
} = require("../controllers/authController");

// POST registration route
router.post("/register", registerCustomer);

// POST login route
router.post("/login", loginCustomer);

module.exports = router;