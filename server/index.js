const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
