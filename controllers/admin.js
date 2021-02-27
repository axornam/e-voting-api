const Candidate = require("../models/candidate");
const uuid = require("uuid");
const { getCandidates } = require(".");

module.exports = {
  postLogin(req, res) {},
  postRegister(req, res) {},
  // Add a new Candidate
  async postCandidate(req, res) {
    try {
      // check if candidate with that email already exists
      let candidate = await Candidate.find({ email: req.body.email });
      console.log("FOUND: ", candidate);

      // if there are existing candidates with such email;
      if (candidate.length > 0) {
        // send error status
        res
          .status(401)
          .json({ message: "A Candidate with that e-mail already exists" });
        // exit the function
        return;
      }

      // save new candidate into database
      candidate = await new Candidate({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        color: req.body.color,
        image: req.body.image,
        position: req.body.position,
        email: req.body.email,
        candidate_id: uuid.v4(),
      });

      await candidate.save();
      console.log("SAVE: ", candidate);

      // if the candidate was saved successfully
      if (candidate != null) {
        // send success message
        res
          .status(201)
          .json({ message: "Candidate Added Successfully to Elections" });
      } else {
        // send error message
        res.status(400).json({
          message: "An Error Occurred While Adding Candidate to Elections",
        });
      }
    } catch (e) {
      //
      res
        .status(500)
        .json({ message: "An Error Occurred, Please Try Again Later" });
      console.log(e);
    }
  },

  async getCandidates(req, res) {
    try {
      let candidates = Candidate.find();
      if (candidates) {
        res.status(200).json(candidates);
      } else {
        res
          .status(404)
          .json({ message: "No Candidates Found, Please Add Candidates" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Respoded with An Error" });
      console.error(error);
    }
  },
  getRegister(req, res) {},
  postVerify(req, res) {},
  getLogout(req, res) {},
  getForgot(req, res) {},
  putForgot(req, res) {},
  getReset(req, res) {},
  putReset(req, res) {},
};
