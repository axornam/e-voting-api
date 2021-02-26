const express = require("express");
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getHome,
  getPolls,
  getResults,
  putCategory,
  getCategories,
  getNextCategory,
} = require("../controllers/index");

/* GET home page. */
router.get("/", getHome);

/* GET /categories */
router.get("/categories", getCategories);

/* GET /category */
router.get("/category", getNextCategory);

/* post /category */
router.put("/category", putCategory);

/* GET /polls  */
router.get("/polls", getPolls);

/* GET /results  */
router.get("/results", getResults);

module.exports = router;
