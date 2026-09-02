const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser
} = require("../models/User");

async function registerCustomer(req, res) {
    // Get name, email and password from the request
    const { name, email, password } = req.body;

    // Validate the input
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {
        // Check whether the email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the customer user
        const userData = {
            name,
            email,
            password: hashedPassword,
            role: "customer"
        };

        const result = await createUser(userData);

        // Send an appropriate response
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


async function loginCustomer(req, res) {
    // Get email and password from the request
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        // Find the user by email
        const user = await findUserByEmail(email);

        // If user does not exist, reject login
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare the supplied password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password is incorrect, reject login
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
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

        // Send successful login response
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


module.exports = {
    registerCustomer,
    loginCustomer
};