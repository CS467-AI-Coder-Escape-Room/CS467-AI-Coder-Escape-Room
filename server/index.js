require("dotenv").config();

const express = require("express");
const cors = require("cors");

const databaseRouter = require('./routes/database');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/database', databaseRouter);

// Routes
app.get("/", (req, res) => {
  res.send("The server is running!");
});

// Health check AWS Elastic Beanstalk
app.get('/health', (req, res) => {
  res.sendStatus(200);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
