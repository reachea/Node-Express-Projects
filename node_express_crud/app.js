const express = require('express');

const { people } = require('./data');

const app = express();

// middlewares
app.use(express.static('./frontend'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api
app.get('/api/people', (req, res) => {
  res.status(200).json({success: true, data: people});
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({success: false, msg: 'Please provide value name!'});
  }

  res.status(201).json({ success: true, person: name });
});

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;

  console.log(name);

  if (!name) {
    return res.status(400).json({success: false, msg: "Please provide value name!"});
  }

  res.status(200).json({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(401).send('Please provide Credentials');
  }

  res.status(200).send(`Welcome ${user}!`);
});

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => {
    return person.id === Number(id);
  });

  if (!person) {
    return res.status(404).json({success: false, msg: `Can't find user with id ${id}`});
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({success: true, data: newPeople});
});

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => {
    return person.id === Number(id)
  });

  if (!person) {
    return res.status(404).json({ success: false, msg: `Can't find person with id ${id}` });
  }

  const newPeople = people.filter((person) => {
    return person.id !== Number(id);
  });

  res.status(200).json({ success: true, data: newPeople });
});

// listening on port
app.listen(5000, () => {
  console.log('listening on port:5000 🚀');
});