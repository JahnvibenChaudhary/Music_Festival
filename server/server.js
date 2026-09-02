require("dotenv").config();

// Import Express
const express = require("express");

// Create Express application
const app = express();

// Enable JSON request body parsing
app.use(express.json());

// Import authentication routes
const authRoutes = require("./routes/authRoutes");

// Import protected routes
const protectedRoutes = require("./routes/protectedRoutes");

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Mount protected routes
app.use("/api/protected", protectedRoutes);

// Start the server
const PORT = process.env.PORT || 5001;

const festivalRoutes = require("./routes/festivalRoutes");

app.use("/api/festivals", festivalRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});