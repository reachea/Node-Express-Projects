const express = require('express');

const app = express();

const { products, people } = require('./data');

app.get('/', (req, res) => {
  res.json(products);
});

app.get('*', (req, res) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

app.listen(5000, () => {
  console.log("listening on port:5000 🚀");
});