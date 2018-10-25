let express = require("express");
let users = require('./state').users;

// TODO finish part 1 of homework for next class

// const usersArr = users.users;

const app = express();

app.use(express.static('public'));

// GET full users array in state.js
// app.use((req,res,next) => {
//   if (req.path === '/users') {
//     return res.send(users);
//   } else if (req.path === '/users/1') {
//     return res.send(users[0]);
//   } else {
//     return res.send("GIMME A PATH!");
//   }
// });

app.get('/users', (req, res, next) => {
  return res.json(users);
});

// GET specific ID of users array in state.js
app.get('/users/:id', (req, res, next) => {
  return res.json(users[req.params.id]);
});

// POST
app.post('/users', (req, res, next) => {
  const postedData = {
    "_id": 6,
    "name": "Hue Jazz",
    "occupation": "getting money",
    "avatar": "Look ova here"
  };

  users.push(postedData);

  return res.json(users[users.length - 1]);
});

// PUT
app.put('/users/:id', (req, res, next) => {
  users[req.params.id].name = "Bob";

  return res.json(users[req.params.id]);
});

// DELETE
app.delete('/users/:id', (req, res, next) => {
  users.splice(req.params.id, 1);

  return res.json(users);
});

app.listen(3002, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Web server is now living in apartment 3002");
});
