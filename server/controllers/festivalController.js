const {
    getFestivals,
    getFestivalById,
    createFestival,
    updateFestival,
    deleteFestival
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

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Create a new festival
async function createFestivalController(req, res) {
    const festivalData = req.body;

    try {
        const result = await createFestival(festivalData);

        return res.status(201).json({
            message: "Festival created successfully",
            festivalId: result.insertedId
        });

    } catch (error) {
        console.error("Error creating festival:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Update an existing festival
async function updateFestivalController(req, res) {
    const { id } = req.params;
    const festivalData = req.body;

    try {
        const result = await updateFestival(id, festivalData);

        // If no festival was found
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Festival not found"
            });
        }

        return res.status(200).json({
            message: "Festival updated successfully"
        });

    } catch (error) {
        console.error("Error updating festival:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete a festival
async function deleteFestivalController(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteFestival(id);

        // If no festival was found
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Festival not found"
            });
        }

        return res.status(200).json({
            message: "Festival deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting festival:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAllFestivals,
    getFestivalDetails,
    createFestivalController,
    updateFestivalController,
    deleteFestivalController
};