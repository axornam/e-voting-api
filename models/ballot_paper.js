const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BallotPaperSchema = new Schema({
  voter_id: String,
  voter_email: String,

  categories: [
    {
      position: String,
      candidate_id: String,
      candidate_email: String,
    },
  ],
});

module.exports = mongoose.model("BallotPaper", BallotPaperSchema);
