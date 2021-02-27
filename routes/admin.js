const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { asyncErrorHandler } = require("../middleware"); // automatically find the index file for this directory
const {
  getReset,
  putReset,
  getLogout,
  putForgot,
  getForgot,
  postLogin,
  getRegister,
  postRegister,
  postCandidate,
  getCandidates,
} = require("../controllers/admin");

/* POST /voter */
router.get("/register", getRegister);

/* POST /candidate */
router.post("/candidates", postCandidate);

/* GET /candidate */
router.get("/candidates", getCandidates);

/* POST /register */
router.post("/register", postRegister);

/* POST /login */
router.post("/login", postLogin);

/* GET /logout*/
router.get("/logout", getLogout);

/* GET /forgot-password /forgot */
router.get("/forgot", getForgot);

/* PUT /forgot-password /forgot */
router.put("/forgot", putForgot);

/* GET /reset-password /reset/:token */
router.get("/reset/:token", getReset);

/* PUT /reset-password /reset/:token */
router.put("/reset/:token", putReset);

module.exports = router;
