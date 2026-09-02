require("dotenv").config({
    path: require("path").join(__dirname, "../.env")
});

const { MongoClient } = require("mongodb");

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

module.exports = {
    getFestivals
};