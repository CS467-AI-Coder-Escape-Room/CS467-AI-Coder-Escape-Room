require("dotenv").config();

const express = require("express");
const cors = require("cors");

const databaseRouter = require('./routes/database');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/database', databaseRouter)

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
