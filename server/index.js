const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server is listening on port ${port}`);