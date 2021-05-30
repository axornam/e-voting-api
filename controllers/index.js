const BallotPaper = require("../models/ballot_paper");
const Candidate = require("../models/candidate");
const Voter = require("../models/voter");

module.exports = {
  // Get Home Details
  async getHome(req, res) {
    // fetch all candidates from database
    try {
      let candidates = await Candidate.find({});
      if (candidates != null && candidates.length > 0) {
        return res.status(200).json({ message: "", data: candidates });
      }
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: "No candidate found", data: {} });
    }
  },

  // Get Next Category With :ID
  async getNextPosition(req, res) {
    try {
      // Get all Candidates
      // Filter catgories with :ID
      let candidates = await Candidate.find({ position: req.params.id }).select(
        "-type"
      );
      // Handle all neccessary errors
      if (candidates != null) {
        // Send Back all Candidates with same Categoy ID
        return res.status(200).json({ message: "", data: candidates });
      } else {
        console.log("No Candidates Found for this Position");
        return res
          .status(404)
          .json({ message: "No Candidates Found for this position" });
      }
    } catch (error) {
      //
      console.log(error);
      return res
        .status(500)
        .json({ message: "Server Responded with An Error" });
    }
  },

  // Cast Vote to Category With :ID
  async putPosition(req, res) {
    try {
      // Check if the Voter ID is inside Already Voted Section
      let voter = await Voter.find({
        email: req.body.voter_email,
        voter_id: req.body.voter_id,
      }).select("-password");

      // if the voter exists
      if (voter != null) {
        // and has not yet voted for this category
        if (true) {
          // Get Candidate with Candidate ID and Postion
          let candidate = await Candidate.find({
            email: req.body.candidate_email,
            candidate_id: req.body.candidate_id,
            position: req.body.position,
          });

          // if the candidate being voted for is valid
          if (candidate != null) {
            // find the voters ballot paper
            let ballot_paper = await BallotPaper.findOne({
              voter_email: req.body.voter_email,
              voter_id: req.body.voter_id,
            });

            // if there is a valid ballot paper for the voter
            if (ballot_paper != null) {
              // add the next vote to the ballot paper
              await ballot_paper.categories.push({
                position: req.body.position,
                candidate_email: req.body.candidate_email,
                candidate_id: req.body.candidate_id,
              });

              // save new vote cast to ballot paper
              await ballot_paper.save();
              // send back the ballot paper on success
              return res.status(201).json({
                message: `Vote Cast Successully for ${req.body.position.toUpperCase()}`,
                data: ballot_paper,
              });
            }
          } else {
            console.log("Candidate Not Found");
            return res.status(404).json({ message: "404 Not Found" });
          }
        } else {
          console.log("You have already Voted");
          return res.status(401).json({ message: "You have already Voted" });
        }
      } else {
        const errorMsg =
          "Voter Credentials Are Invalid, Try Again or Consult Your Administrator";
        console.log(errorMsg);
        return res.status(404).json({ message: errorMsg });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Server Responded with An Error" });
    }
  },

  // Get Elections Results for Category With :ID
  async getResults(req, res) {
    try {
      // Get All Ballot Papers
      let papers = await BallotPaper.find();
      // results array to hold position, winner and vice
      let results = {};
      let ids = {};
      //
      if (papers != null) {
        // Iterate over Each Ballot Paper Gotten from DB
        for (const paper of papers) {
          // Collate Results for Each Category
          for (const cat of paper.categories) {
            // Calculate Total results for Each Category
            if (ids[cat.candidate_id] == null) {
              ids[cat.candidate_id] = 1;
            } else {
              // Increment Counter for Each Candidate In Each Position
              ids[cat.candidate_id] += 1;
            }
            // assign temp ids to collation results
            results[cat.position] = ids;
          }
          // null the temp array
          ids = {};

          console.log(results);
        }
        // Format Entries into an Object
        // Send JSON data
        return res
          .status(200)
          .json({ message: "Collated Election Results", data: papers });
      } else {
        // if not ballot papers were found
      }
    } catch (error) {
      console.log(error);
      return res.json(500).json({ message: error });
    }
  },

  // Get Results For One Category
  getCategoryResults(req, res) {},
};
