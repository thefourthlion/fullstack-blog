const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    // salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and send data
    const user = await newUser.save();

    res.status(200).json({ post: "successful", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    // see if user has username and password that match
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username and password combination.");
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.json("Wrong username and password combination.");

    // take password out of data sent
    const { password, ...others } = user._doc;
    res.status(200).json({ post: "successful", user: others });
  } catch (err) {
    res.status(500).json(err);
  }
};
