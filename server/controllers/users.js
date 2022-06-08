const User = require("../models/User");
const bcrypt = require("bcrypt");
const Posts = require("../models/Posts");

// update
exports.update = async (req, res) => {
  if (req.body.userID === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ put: "success", user: updateUser });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can't update anyone else's account.");
  }
};

// delete
exports.deleteUser = async (req, res) => {
  if (req.body.userID === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        // delete user posts
        await Posts.deleteMany({ username: user.username });
        // find and delete user
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ delete: "success", user: "has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json({ delete: "failed", user: "user not found" });
    }
  } else {
    res.status(401).json("You can't delete anyone else's account.");
  }
};

// get user

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(402).json({ get: "failed", user: "not found" });
  }
};
