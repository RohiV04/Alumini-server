const express = require("express");

const link = express.Router();
const Link = require("../models/linkedin");
link.get("/link", async (req, res) => {
  try {
    const link = await Link.find();
    res.json(link);
  } catch (err) {
    res.send("Error " + err);
  }
});

link.get("/link/:token", async (req, res) => {
  try {
    const link = await Link.findOne({ token: req.params.token });
    res.json(link);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

link.post("/link", async (req, res) => {
  const link = new Link({
    email: req.body.email,
    token: req.body.access-token,
    name: req.body.name,
  });
  try {
    let u1 = await link.save();
    res.send(u1);
  } catch (err) {
    res.send(err);
  }
});

link.delete("/link/:id", async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    res.send(link);
  } catch (err) {
    console.log(err);
  }
});

module.exports = link;
