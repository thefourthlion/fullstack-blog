const Posts = require("../models/Posts");

// create new post
exports.createPost = async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json({ post: "successful", post: savePost });
  } catch (err) {
    res.status(500).json({ post: "failed", post: "not created" });
  }
};

// update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json({ put: "successful", post: updatedPost });
      } catch (err) {
        res.status(500).json({ put: "failed", post: "" });
      }
    } else {
      res.status(401).json({
        put: "failed",
        post: "not allowed to update posts that aren't yours.",
      });
    }
  } catch (err) {
    res.status(500).json({
      put: "failed",
      post: "not allowed to update posts that aren't yours.",
    });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        // delete user post
        await post.delete();
        res.status(200).json({ delete: "success", post: "has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({
        delete: "failed",
        post: "you can't delete anyone else's post.",
      });
    }
  } catch (err) {
    res.status(404).json({ delete: "failed", post: "post not found" });
  }
};

// get post
exports.getPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json([post]);
  } catch (err) {
    res.status(402).json(err);
  }
};

// get all post
exports.getAllPosts = async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Posts.find({ username });
    } else if (category) {
      posts = await Posts.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Posts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(402).json({ get: "failed", post: "not found" });
  }
};
