require("dotenv").config({
    path: require("path").join(__dirname, "../.env")
});

const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getFestivals() {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access festivals collection
    const festivalsCollection = db.collection("festivals");

    // Retrieve all festivals
    const festivals = await festivalsCollection.find({}).toArray();

    // Return all festivals
    return festivals;
}

async function getFestivalById(id) {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access festivals collection
    const festivalsCollection = db.collection("festivals");

    // Convert string ID to MongoDB ObjectId
    const objectId = new ObjectId(id);

    // Find festival by _id
    const festival = await festivalsCollection.findOne({
        _id: objectId
    });

    // Return the festival
    return festival;
}

// Create a new festival
async function createFestival(festivalData) {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access festivals collection
    const festivalsCollection = db.collection("festivals");

    // Insert the new festival
    const result = await festivalsCollection.insertOne(festivalData);

    // Return the result
    return result;
}

// Update a festival by _id
async function updateFestival(id, festivalData) {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access festivals collection
    const festivalsCollection = db.collection("festivals");

    // Convert string ID to MongoDB ObjectId
    const objectId = new ObjectId(id);

    // Update the festival
    const result = await festivalsCollection.updateOne(
        { _id: objectId },
        { $set: festivalData }
    );

    // Return the result
    return result;
}

// Delete a festival by _id
async function deleteFestival(id) {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access festivals collection
    const festivalsCollection = db.collection("festivals");

    // Convert string ID to MongoDB ObjectId
    const objectId = new ObjectId(id);

    // Delete the festival
    const result = await festivalsCollection.deleteOne({
        _id: objectId
    });

    // Return the result
    return result;
}

module.exports = {
    getFestivals,
    getFestivalById,
    createFestival,
    updateFestival,
    deleteFestival
};