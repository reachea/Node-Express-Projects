const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

// middlewares
app.use(express.static('./frontend'));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/people', people);
app.use('/login', auth);

// listening on port
app.listen(5000, () => {
  console.log('listening on port:5000 🚀');
});