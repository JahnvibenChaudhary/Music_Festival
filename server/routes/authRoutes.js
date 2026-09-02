const express = require("express");

const router = express.Router();

const {
    registerCustomer,
    loginCustomer,
    loginAdmin
} = require("../controllers/authController");

// POST registration route
router.post("/register", registerCustomer);

// POST customer login route
router.post("/login", loginCustomer);

// POST administrator login route
router.post("/admin-login", loginAdmin);

module.exports = router;