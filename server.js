const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // You can change this port to any available port you want

// Set the absolute path for the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Set up a route to serve your single-page site
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
