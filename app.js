const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
mongoose.set("strictQuery", true);
const url =
  "mongodb+srv://root:21B91A6257@cluster0.nljx12k.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.port || 8080;
mongoose.connect(url);
const con = mongoose.connection;
con.once("open", function () {
  console.log("connected");
});
const userRouter = require("./router/users");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", userRouter);
app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
