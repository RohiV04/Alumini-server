const express = require("express");
const mailgun=require('mailgun-js');

const DOMAIN = 'alumini.mydomain.com';
const mg = mailgun({apiKey:'71ef012ba27b550b2f2939198c155923-30344472-5ed21e6c', domain: DOMAIN});
const user = express.Router();
const User = require("../models/user");
user.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.send("Error " + err);
  }
});

user.get("/register/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

user.post("/register", async (req, res) => {
  const user = new User({
    email: req.body.Email,
    password: req.body.Password,
    name: req.body.Name,
    pno: req.body.Mobile,
   regdno:req.body.Regdno,
    profess:req.body.Profession
  });
  try {
    sendmail(req.body.Email,req.body.Name);
    let u1 = await user.save();
    res.send(u1);

  } catch (err) {
    res.send(err);
  }
});


function sendmail(Email,Name){
    const mailData = {
      from: '21B91A6234@srkrec.ac.in',
      to:  Email,
      subject: 'Confirm your Account ! '+Name,
      template: "account_confirm",
      "v:user_name": Name
    };
    mg.messages().send(mailData, function (error, body) {
      console.log(body);
    });
    }


user.delete("/register/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = user;
