const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  email: String,
  image: String,
  category: String,
  first_name: String,
  last_name: String,
});

module.exports = mongoose.model("Candidate", CandidateSchema);
