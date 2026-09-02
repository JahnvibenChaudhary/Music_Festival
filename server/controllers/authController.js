const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser
} = require("../models/User");


// Register customer
async function registerCustomer(req, res) {
    // Receive input
    const { name, email, password } = req.body;

    // Required fields check
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    // Check name is not only spaces
const trimmedName = name.trim();

if (!trimmedName) {
    return res.status(400).json({
        message: "Name cannot be empty"
    });
}

    // Format/strength validation - US03
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        });
    }

    try {
        // Check duplicate email
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create customer
        const userData = {
            name: trimmedName,
            email: email,
            password: hashedPassword,
            role: "customer"
        };

        const result = await createUser(userData);

        return res.status(201).json({
            message: "Customer registered successfully",
            userId: result.insertedId
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// Login customer
async function loginCustomer(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // US03 email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please provide a valid email address"
    });
}

// US03 password validation
if (password.length < 8) {
    return res.status(400).json({
        message: "Password must be at least 8 characters long"
    });
}

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// Login administrator
async function loginAdmin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // US03 email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please provide a valid email address"
    });
}

// US03 password validation
if (password.length < 8) {
    return res.status(400).json({
        message: "Password must be at least 8 characters long"
    });
}

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (user.role !== "administrator") {
            return res.status(403).json({
                message: "Access denied. Administrator privileges required."
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Administrator login successful",
            token: token
        });

    } catch (error) {
        console.error("Administrator login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    registerCustomer,
    loginCustomer,
    loginAdmin
};