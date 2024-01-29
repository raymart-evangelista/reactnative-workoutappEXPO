const bcrypt = require("bcrypt");
const express = require("express");

const usersRouter = express.Router();
const User = require("../models/user");

// post
usersRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      email,
      passwordHash,
    });

    const userToSave = await user.save();
    res.status(200).json(userToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get by ID method
// router.get('/users/:id', async (req, res) => {
usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    // res.status(404).json({ message: error.message })
    res.status(400).send({ error: "malformatted id" });
  }
});

// update by ID method
usersRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete by ID method
usersRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.send(
      `Document with username and id, ${user.username}: ${user.id},  has been deleted`,
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// sign up
// router.post('/signup', async (req, res) => {
//   try {
//     const newData = new Data({
//       username,
//       email,
//       password
//     })

//     newData.save()
//       .then(data => {
//         res.json(data)
//       })
//   } catch (error) {
//     res.status(400).json
//   }
// })
usersRouter.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const userToSave = await user.save();
    res.status(200).json(userToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = usersRouter;
