const router = require("express").Router();

const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} = require("../controllers/posts");

router.route("/").post(createPost);

router.route("/:id").put(updatePost);

router.route("/:id").delete(deletePost);

router.route("/:id").get(getPost);

router.route("/").get(getAllPosts);

// router.route("/:id").delete(deleteUser);

// router.route("/:id").get(getUser);

// router.route("/forgotPassword").post(forgotPassword);

// router.route("/passwordReset/:resetToken").put(resetPassword);

module.exports = router;
