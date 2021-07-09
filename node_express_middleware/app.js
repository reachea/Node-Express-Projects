// modules
const express = require('express');
const morgan = require('morgan');

// middlewares
const logger = require('./middlewares/logger');
const authorize = require('./middlewares/authorize');

const app = express();

app.use([logger, authorize]);
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).send('Home Page');
});

app.get('/about', (req, res) => {
  res.status(200).send('About Page');
});

app.get('/api/products/:productID', (req, res) => {
  const user = req.user;
  const {productID} = req.params;
  res.status(200).send(`user: ${JSON.stringify(user)}, product id: ${JSON.stringify(productID)}`);
});

app.get('/api/items/:itemID', (req, res) => {
  const user = req.user;
  const {itemID} = req.params;
  res.status(200).send(`user: ${user}, item id: ${itemID}`);
});

app.get('*', (req, res) => {
  res.status(404).send('Page not found!');
});

// listening on port
app.listen(5000, () => {
  console.log('listening on port:5000 🚀');
})