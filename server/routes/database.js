var express = require("express");
var router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// MongoDB connection
const URI = process.env.MONGODB_URI;
const Score = require("../models/Score");
// Variable to store the scores collection
let scores = null;

// Connect to MongoDB
const client = new MongoClient(URI, {
  maxPoolSize: 10,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    //Send a ping to confirm a successful connection
    await client.db("leaderboard").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB."
    );
    // store collection for later use
    scores = client.db("leaderboard").collection("scores");
  } catch (error) {
    console.log("Could not connect to MongoDB" + error);
  }
}
run().catch(console.dir);
// End of MongoDB connection

// // Create a new document POST
// router.post("/create", async (req, res) => {
//   const newScore = new Score({
//     initials: req.body.initials,
//     time: req.body.time,
//   });
//   console.log(newScore);
//   try {
//     await scores.insertOne(newScore);
//     const message = (message);
//     res.status(201).send(message);
//   } catch (error) {
//     console.log("Error creating document" + error);
//     res.status(500).send(error);
//   }
// });

// Create a new document
router.get("/create/:initials/:score", async (req, res) => {
  const newScore = new Score({
    initials: req.params.initials,
    time: req.params.score,
  });
  console.log(newScore);
  try {
    const result = await scores.insertOne(newScore);
    const message = `Score id: ${result.insertedId} created successfully`;
    console.log(message)
    res.status(201).send(message);
  } catch (error) {
    console.log("Error creating document" + error);
    res.status(500).send(error);
  }
});

// Read all documents
router.get("/leaderboard", async (req, res) => {
  const query = {};
  // sort by time ascending
  const options = {
    sort: { time: 1 },
  };
  const cursor = scores.find(query, options).limit(10);
  // Get all documents from the database
  try {
    if ((await scores.countDocuments(query)) == 0) {
      console.log("No documents in database");
      res.status(404).send("No documents in database");
    } else {
      const results = await cursor.toArray();
      console.log(`Leaderboard ${JSON.stringify(results)}`);
      res.status(200).send(results);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete all documents from the database
router.get("/delete-all", async (req, res) => {
  try {
    result = await scores.deleteMany({});
    const deletedCount = result.deletedCount;
    const message = (`Successfully deleted ${deletedCount} documents from the Scores collection.`);
    console.log(message);
    res.status(200).send(message);
  } catch (error) {
    console.log(error);
  }
});

// Add a dummy group of documents to the database
router.get("/add-dummy-scores", async (req, res) => {
  const newScores = [
    {initials:"HHH",time:500},{initials:"KKK",time:850},
    {initials:"DDD",time:900},{initials:"BBB",time:1000},
    {initials:"AAA",time:1200},{initials:"\"LLL\"",time:1468},
    {initials:"CCC",time:1500},{initials:"GGG",time:1900},
    {initials:"III",time:2000},{initials:"FFF",time:2120}];
  try {
    const result = await scores.insertMany(newScores);
    console.log(`Inserted ${result.insertedCount} dummy scores`)
    res. status(201).json({insertedCount: result.insertedCount, insertedIds: result.insertedIds});
  } catch (error) {
    console.log(error);
  }
});
  
// on cleanup close connection to the database
const cleanup = (event) => {
  client.close();
  console.log("Connection closed");
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

module.exports = router;
