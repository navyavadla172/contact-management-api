const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Simple server is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
});
