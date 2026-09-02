const { getFestivals } = require("../models/Festival");

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

module.exports = {
    getAllFestivals
};