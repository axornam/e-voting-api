const express = require("express");
const router = express.Router();
const { asyncErrorHandler } = require("../middleware"); // automatically find the index file for this directory
const {
  postLogin,
  getLogout,
  postVerify,
  putForgot,
  getForgot,
  getReset,
  putReset,
  postRegister,
} = require("../controllers/auth"); // automatically find the index file for this directory

/* POST /register */
router.post("/register", postRegister);

/* POST /verify */
router.post("/verify", postVerify);

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
