var express = require("express");
var router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// MongoDB connection
const URI = process.env.MONGODB_URI;
const Score = require("../models/Score");

// Connect to MongoDB
const client = new MongoClient(URI, {
  maxPoolSize: 10,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Variable to store the scores collection
let scores = null;

async function run() {
  try {
    // Connect the client to ther server
    await client.connect();
    //Send a ping to confirm a successful
    await client.db("leaderboard").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB."
    );
    // store collection
    scores = client.db("leaderboard").collection("scores");
  } catch (error) {
    console.log("Could not connect to MongoDB" + error);
  }
}
run().catch(console.dir);
// End of MongoDB connection

// // Create a new document
// router.post("/create", async (req, res) => {
//   const newScore = new Score({
//     initials: req.body.initials,
//     time: req.body.time,
//   });
//   console.log(newScore);
//   try {
//     await scores.insertOne(newScore);
//     console.log("Score created successfully");
//     res.status(201).send("Score created successfully");
//   } catch (error) {
//     console.log("Error creating document" + error);
//     res.status(500).send(error);
//   }
// });

// Create a new document
router.get("/create", async (req, res) => {
  const { initials, time } = req.query;
  const newScore = new Score({
    initials: initials,
    time: time,
  });
  console.log(newScore);
  try {
    await scores.insertOne(newScore);
    console.log("Score created successfully");
    res.status(201).send("Score created successfully");
  } catch (error) {
    console.log("Error creating document" + error);
    res.status(500).send(error);
  }
});

// Read all documents
router.get("/leaderboard", async (req, res) => {
  const query = {};
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
      console.log("Found documents");
      res.status(200).send(results);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

const cleanup = (event) => {
  client.close();
  console.log("Connection closed");
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

module.exports = router;
