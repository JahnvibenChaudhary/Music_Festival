require("dotenv").config();

// Import Express
const express = require("express");

// Create Express application
const app = express();

// Enable JSON request body parsing
app.use(express.json());

// Import authentication routes
const authRoutes = require("./routes/authRoutes");

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});