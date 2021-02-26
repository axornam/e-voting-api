const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoterSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  type: {
    default: "voter",
    type: String,
  },
  voter_id: String,
  password: String,
});

module.exports = mongoose.model("Voter", VoterSchema);
