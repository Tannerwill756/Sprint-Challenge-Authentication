const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password",
    });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

function isValid(user) {
  return Boolean(user.username && user.password);
}

module.exports = router;
