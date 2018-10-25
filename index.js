const express = require("express");
const bodyParser = require('body-parser');
let users = require('./state').users;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/users', (req, res, next) => {
  return res.json(users);
});

// GET specific ID of users array in state.js
app.get('/users/:id', (req, res, next) => {
  return res.json(users[req.params.id]);
});

// POST
app.post('/users', (req, res, next) => {
  // get name from req.body
  // increment _id +1
  const newUser = {
    _id: users[users.length-1]._id + 1,
    name: req.body.name
  };

  // add new user to users array
  users.push(newUser);

  // return the item just added
  return res.json(users[users.length - 1]);
});

// PUT
app.put('/users/:id', (req, res, next) => {
  users[req.params.id].name = "Bob";

  // return item just updated
  return res.json(users[req.params.id]);
});

// DELETE
app.delete('/users/:id', (req, res, next) => {
  // we dont want to actually delete the object
  // just add a boolean flag marking it as inactive
  users[req.params.id].isActive = false;

  // return text notifying that object was deleted
  return res.send("deleted");
});

// handle incorrect API calls
// order of these routes matters
// put this last
app.use((req, res, next) => {
  return res.send("ERROR INVALID URL");
});

// tell server to listen on port 3002
app.listen(3002, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Web server is now living in apartment 3002");
});
