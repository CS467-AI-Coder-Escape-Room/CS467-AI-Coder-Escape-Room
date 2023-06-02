const express = require('express');
const path = require('path');
const app = express();
const mime = require('mime');

mime.types['glb'] = 'model/gltf-binary';  // Add the MIME type for .glb files

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.use(express.static(path.join(__dirname, '..', 'client', 'public'), {
  setHeaders: function (res, path) {
    if (mime.getType(path) === 'model/gltf-binary') {
      res.setHeader('Content-Type', 'model/gltf-binary');
    }
  }
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server is listening on port ${port}`);