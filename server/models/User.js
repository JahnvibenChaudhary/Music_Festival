require("dotenv").config({ 
    path: require("path").join(__dirname, "../.env") 
});

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getUsersCollection() {
    await client.connect();

    const db = client.db("MusicFest");

    return db.collection("users");
}

async function findUserByEmail(email) {
    const usersCollection = await getUsersCollection();

    const user = await usersCollection.findOne({ email: email });

    return user;
}

async function createUser(userData) {
    const usersCollection = await getUsersCollection();

    const result = await usersCollection.insertOne(userData);

    return result;
}

module.exports = { 
    getUsersCollection, 
    findUserByEmail, 
    createUser 
};