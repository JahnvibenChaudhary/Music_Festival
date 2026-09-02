const {
    getFestivals,
    getFestivalById
} = require("../models/Festival");

async function getAllFestivals(req, res) {
    try {
        const festivals = await getFestivals();

        return res.status(200).json(festivals);

    } catch (error) {
        console.error("Error retrieving festivals:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getFestivalDetails(req, res) {
    // Get festival ID from request parameters
    const { id } = req.params;

    try {
        // Find festival by ID
        const festival = await getFestivalById(id);

        // If no festival is found
        if (!festival) {
            return res.status(404).json({
                message: "Festival not found"
            });
        }

        // Return festival with 200
        return res.status(200).json(festival);

    } catch (error) {
        console.error("Error retrieving festival details:", error);

        // Database/other error
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAllFestivals,
    getFestivalDetails
};