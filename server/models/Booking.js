require("dotenv").config({
    path: require("path").join(__dirname, "../.env")
});

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getBookings() {
    // Connect to MongoDB
    await client.connect();

    // Select MusicFest database
    const db = client.db("MusicFest");

    // Access bookings collection
    const bookingsCollection = db.collection("bookings");

    // Retrieve all bookings
    const bookings = await bookingsCollection.find({}).toArray();

    // Return all bookings
    return bookings;
}

module.exports = {
    getBookings
};