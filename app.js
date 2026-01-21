const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello from second branch🚀');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
