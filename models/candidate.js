const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  first_name: String,
  last_name: String,
  position: String,
  color: String,
  email: String,
  image: String,
  candidate_id: String,
  type: {
    default: "candidate",
    type: String,
  },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
