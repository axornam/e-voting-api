const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: String,
  admin_id: String,
  type: {
    default: "admin",
    type: String,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
