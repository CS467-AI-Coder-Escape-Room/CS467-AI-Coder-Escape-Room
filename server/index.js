require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to ther server
    await client.connect();
    //Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB."
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// End of MongoDB connection

// Test route to confirm connection to MongoDB
app.get("/test", (req, res) => {
  res.send("Hello World from test route!");
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
