const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(401).send('Please provide Credentials');
  }

  res.status(200).send(`Welcome ${user}!`);
});

module.exports = router;