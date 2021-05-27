const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.split(".").slice(-1).toString();
      let name = `${file.originalname
        .split(" ")
        .join("-")
        .split(".")
        .slice(0, -1)
        .join(".")}-${Date.now()}.${ext}`;
      cb(null, name);
    },
  }),
});
const { asyncErrorHandler } = require("../middleware");
const {
  getReset,
  putReset,
  putForgot,
  getForgot,
  getLogout,
  postLogin,
  postVoter,
  postCandidate,
  getCandidates,
  getCandidate,
  putCandidate,
} = require("../controllers/admin");

/* POST /candidate */
router.post("/candidates", upload.single("image"), postCandidate);

/* GET /candidate */
router.get("/candidates", getCandidates);

/* GET /candidate/:id */
router.get("/candidates/:candidate_id", getCandidate);

/* PUT /candidate/:id */
router.put("/candidates/:candidate_id", upload.single("image"), putCandidate);

/* POST /voter */
router.post("/voter", postVoter);

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
