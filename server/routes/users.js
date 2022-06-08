const router = require("express").Router();

const { update, deleteUser, getUser } = require("../controllers/users");

router.route("/:id").put(update);

router.route("/:id").delete(deleteUser);

router.route("/:id").get(getUser);
module.exports = router;
