const express = require("express");
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getHome,
  getResults,
  putPosition,
  getPositions,
  getNextPosition,
  getCategoryResults,
} = require("../controllers/index");

/* GET home page. */
router.get("/", getHome);

/* GET /categories */
router.get("/positions", getPositions);

/* GET /category */
router.get("/positions/:id", getNextPosition);

/* post /category */
router.put("/positions", putPosition);

/* GET /results  */
router.get("/results", getResults);

/* GET /results/:id */
router.get("/results/:category", getCategoryResults);

module.exports = router;
