require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

const protectedRoutes = require("./routes/protectedRoutes");

const festivalRoutes = require("./routes/festivalRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/protected", protectedRoutes);

app.use("/api/festivals", festivalRoutes);

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});