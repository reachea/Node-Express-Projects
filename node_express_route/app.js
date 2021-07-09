const express = require('express');

const app = express();

const { products, person } = require('./data');

// routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to home page!</h1><p>go to <a href="/api/products">products</a></p>');
});

app.get('/api/products', (req, res) => {
  const clientProducts = products.map((product, index) => {
    const {id, name, price} = product;

    return {id, name, price};
  });

  res.status(200).json(clientProducts);
});

app.get('/api/products/:productID', (req, res) => {

  const { productID } = req.params;

  const queryProduct = products.filter((product) => {
    return product.id === Number(productID);
  });

  res.status(200).json(queryProduct);
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params);

  const {productID, reviewID} = req.params;

  res.status(200).send(`<p>product id: ${productID}</p><p>review id: ${reviewID}</p>`);
})

app.get('/api/v1/query', (req, res) => {
  let sortedProducts = [...products];

  const {search, limit} = req.query;

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, limit);
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({success: true, data: []});
  }

  res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

// listening on port

app.listen(5000, () => {
  console.log('listening on port:5000 🚀');
});