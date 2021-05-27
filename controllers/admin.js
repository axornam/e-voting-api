const Candidate = require("../models/candidate");
const uuid = require("uuid");

module.exports = {
  // Login to Admin
  async postLogin(req, res) {
    //
  },

  // Add a new Candidate
  async postCandidate(req, res) {
    try {
      // check if candidate with that email already exists
      let candidate = await Candidate.find({ email: req.body.email });
      console.log("FOUND: ", candidate);

      // if there are existing candidates with such email;
      if (candidate.length > 0) {
        // send error status
        return res
          .status(401)
          .json({ message: "A Candidate with that e-mail already exists" });
        // exit the function
      }

      if (!req.file)
        return res.status(401).json({ message: "No File was Uploaded" });

      // build url for storing images
      let image_url = `${req.protocol}://${req.get("host")}/public/uploads/${
        req.file.filename
      }`;

      // save new candidate into database
      candidate = await new Candidate({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        color: req.body.color,
        image: image_url,
        position: req.body.position,
        email: req.body.email,
        candidate_id: uuid.v4(),
      });

      await candidate.save();
      console.log("SAVE: ", candidate);

      // if the candidate was saved successfully
      if (candidate != null) {
        // send success message
        res.status(201).json({
          message: "Candidate Added Successfully to Elections",
          data: candidate,
        });
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

  // Get All Candidates
  async getCandidates(req, res) {
    try {
      let candidates = await Candidate.find({});
      if (candidates) {
        res.status(200).json({ message: "Success", data: candidates });
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

  // Put / Edit One Candidate
  async putCandidate(req, res) {
    try {
      let candidate = await Candidate.findOne({
        candidate_id: req.params.candidate_id,
      });

      let image_url = `${req.protocol}://${req.baseUrl}/public/uploads/${req.body.image}`;
      console.log("FOUND: ", candidate);

      // Edit Candidate Details
      candidate.first_name = req.body.first_name;
      candidate.last_name = req.body.last_name;
      candidate.image = image_url;
      candidate.color = req.body.color;
      candidate.position = req.body.position;
      candidate.email = req.body.email;

      // Save New Candidate
      await candidate.save();

      if (candidate != null) {
        res.status(201).json({ message: "", data: candidate });
      } else {
        res.status(400).json({
          message: `Could Not Update Candidate with ID: ${candidate.candidate_id}`,
        });
      }
    } catch (error) {
      //
      console.error(error);
      res.status(500).json({ message: "The Server Responsed with An Error" });
    }
  },

  // GET One Candidate
  async getCandidate(req, res) {
    try {
      // find candidates with position / category type
      let candidate = await Candidate.find({
        candidate_id: req.params.candidate_id,
      });
      if (candidate != null) {
        res.status(200).json({ message: "", data: candidate });
      } else {
        res.status(404).json({ message: "Candidate Not Found" });
      }
    } catch (e) {
      console.log(e);
    }
  },

  // Add a new Voter
  postVoter(req, res) {},
  getLogout(req, res) {},
  getForgot(req, res) {},
  putForgot(req, res) {},
  getReset(req, res) {},
  putReset(req, res) {},
};
