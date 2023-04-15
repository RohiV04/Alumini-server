const express = require("express");

const test = express.Router();
const Test = require("../models/test");
test.get("/check/:reg", async (req, res) => {
  try {
    const reg = await Test.findOne({ reg: req.params.reg });
    res.json(reg);
  } catch (err) {
    console.log(err);
  }
});
test.get("/check", async (req, res) => {
    try {
      const reg = await Test.find();
      res.json(reg);
    } catch (err) {
      console.log(err);
    }
  });
  test.post("/check", async (req, res) => {
    const reg = new Test({
        reg: req.body.reg
        
      });
    try {
        let u1 = await reg.save();
        res.send(u1);
      
    } catch (err) {
      console.log(err);
    }
  });
module.exports=test;