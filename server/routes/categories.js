const router = require("express").Router();

const { createCategory, getCategories } = require("../controllers/categories");

router.route("/").post(createCategory);

router.route("/").get(getCategories);

module.exports = router;
