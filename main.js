const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // You can change the port if needed

// Serve static files from the "project-root" directory
app.use(express.static(path.join(__dirname, 'project-root')));

// Route to serve the main index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-root', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
