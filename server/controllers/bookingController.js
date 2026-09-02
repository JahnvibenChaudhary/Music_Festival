const { getBookings } = require("../models/Booking");

async function getAllBookings(req, res) {
    try {
        const bookings = await getBookings();

        return res.status(200).json(bookings);

    } catch (error) {
        console.error("Error retrieving bookings:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAllBookings
};