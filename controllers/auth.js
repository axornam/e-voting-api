require("dotenv").config();
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Voter = require("../models/voter");

module.exports = {
  // REGISTER A NEW USER
  async postRegister(req, res) {
    try {
      // check if user that email already exists
      let usr = await Voter.findOne({
        email: req.body.email,
        voter_id: req.body.voter_id,
      });

      // if the user already exists
      if (usr) {
        res
          .status(404)
          .send({ message: "A user with that email already exists" });
        return;
      } else {
        // if the user does'nt exits
        // hash the password
        let hash_pass = await bcrypt.hash(req.body.password, 10);
        // create a new user
        let newVoter = await new Voter({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone: req.body.phone,
          email: req.body.email,
          voter_id: uuid.v4(),
          password: hash_pass,
        });

        // save the new user to mongodb
        let result = await newVoter.save();

        if (result) {
          // if the user is successfully saved
          res.status(201).send({ message: "Registration Successfull" });
        } else {
          res
            .status(400)
            .send({
              message:
                "Error while Creating Your Account, Please Try Again Later",
            });
        }
      }
    } catch (e) {
      // catch all server operation errors
      res
        .status(500)
        .send({ message: "Server Responded With an Error, Please try Again" });
      console.log(e);
    }
  },
  // VERIFY A NEW USER
  postVerify(req, res) {},
  // LOGIN A NEW USER
  async postLogin(req, res) {
    try {
      // Check if User Exists with same email and voter_id
      let usr = await Voter.findOne({
        email: req.body.email,
        voter_id: req.body.voter_id,
      });

      if (usr) {
        // if the user exists then
        // compare userpassword with hashed password
        let result = await bcrypt.compare(req.body.password, usr.password);
        if (result) {
          // if the user password is valid
          // Send Success Message and the user Token
          res.status(200).json({
            message: "Authentication Successfull",
            token: access_token,
          });
        } else {
          // if the user password is wrong then
          // send a 401 unauthorized error
          res
            .status(401)
            .json({ message: "Invalid Email and Password Combinations" });
        }
      } else {
        // if the user doesn't exists
        // return a 404 not found
        res.status(404).json({
          message:
            "No User with email - voter id combo found, Please Contact Your Admin",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Responded with An Error" });
    }
  },
  // LOGOUT A NEW USER
  getLogout(req, res) {},
  // GET FORGOT PASSWORD TOKEN
  getForgot(req, res) {},
  // FORGOT PASSWORD
  putForgot(req, res) {},
  // RESET PASSWORD
  getReset(req, res) {},
  // RESET PASSWORD
  putReset(req, res) {},
};
