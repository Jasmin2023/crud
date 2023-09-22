const express = require('express');
const app = express();
const PORT = 3000; // You can change this port to any available port you want

// Set up a route to serve your single-page site
app.get('/', (req, res) => {
  //res.send('Welcome to your single-page site!');
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
