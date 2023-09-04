const express = require('express');
const app = express();

// Serve static files (including JavaScript)
app.use(express.static('public'));

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
