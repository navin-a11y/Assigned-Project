const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

const User = mongoose.model("User");
const checkPassword =require("./../models/userModel");

exports.createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = new User({ name: name });
    await user.save();

    res.send({ status: 1, message: "Record created!!", data: user });
  } catch (error) {
    return res.send({ status: 0, message: "Record not created!!" });
  }
};

exports.listUser = async (req, res) => {
  try {
    const users = await User.find();

    res.send({
      status: 1,
      message: "Record successfully fetched",
      data: users,
    });
  } catch (error) {
    res.send({ status: 0, message: error.message });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);

    res.send({
      status: 1,
      message: "Record successfully fetched",
      data: users,
    });
  } catch (err) {
    res.send({ status: 0, message: err.message });
  }
};

// User Login

exports.login = (async (req, res, next) => {
  const { name, password } = req.body;

  // 1. check if email and password is exist or not
  if (!name || !password) {
    return res
      .status(400)
      .send({ status: 0, message: "please provide name and password!" });
  }

  // 2. check if user is exit and password is correct
  let user = await User.findOne({ name: name }).select("+password"); // or only ({email})

  // 3. If user DNE then create new user
  if (!user) {
    const hashedPasssword = bcrypt.hashSync(password, 12);
    user = await User.insertMany([{ name: name, password: hashedPasssword }]);
    user = user[0]
  }

  // const correct = await user.correctPassword(password, user.password);
  if (!(await checkPassword.correctPassword(password, user.password))) {
    return res.status(400).send({ status: 0, message: "Incorrect password!" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    "secret",
    { expiresIn: 60 * 60 * 1000 }
  );

  res.cookie("token", token, { maxAge: 60 * 60 * 1000 })

  res
    .status(200)
    .send({ status: 1, message: "Logged In Successfully!!", token: token });
});

exports.protect = (async (req, res, next) => {
  // 1. get the token & checking if it exist
  const token = (req.headers.cookie.split(" ")[1].split("=")[1]);

  if (!token) {
    return res
    .status(400)
    .send({ status: 0, message: "You are not logged in! please login to get access"});
  }
  //2. verification token
  const decoded = await promisify(jwt.verify)(token, "secret");

  //3. check if user still exists
  const freshUser = await User.findById(decoded.userId);

  if (!freshUser) {
    return res
    .status(401)
    .send({ status: 0, message: "The user belonging to this token no longer exists"});
  }

  // Grand access to protected routes
  req.user = freshUser;
  //req.user = currentUser;
  next();
});
