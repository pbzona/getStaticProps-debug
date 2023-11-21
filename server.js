const express = require('express');
const rateLimit = require('express-rate-limit');
const { apiData } = require('./data');

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 5, // limit each IP to 5 requests per windowMs
  handler: function (req, res /*next*/) {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});

app.use(limiter);

app.get('/', (_, res) => {
  res.json(apiData);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = apiData.find(d => d.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
