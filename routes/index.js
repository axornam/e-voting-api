const express = require("express");
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getHome,
  getResults,
  putPosition,
  getPositions,
  getNextPosition,
} = require("../controllers/index");

/* GET home page. */
router.get("/", getHome);

/* GET /categories */
router.get("/positions", getPositions);

/* GET /category */
router.get("/positions/:id", getNextPosition);

/* post /category */
router.put("/position", putPosition);

/* GET /results  */
router.get("/results", getResults);

module.exports = router;
