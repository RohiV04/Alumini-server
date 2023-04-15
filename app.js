const express = require("express");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const cors = require("cors");
const app = express();

mongoose.set("strictQuery", true);
const url =
  "mongodb+srv://root:root@cluster0.zocib2i.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 9000;
mongoose.connect(url);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(prompt) {
  try {
    const completion = await openai.completions.create({
      engine: "text-davinci-002",
      prompt: prompt,
      maxTokens: 5,
      n: 1,
      stop: "\n",
    });
    console.log(completion.choices[0].text);
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());

app.post("/completion", async (req, res) => {
  const prompt = req.body.prompt;
  await runCompletion(prompt);
  res.sendStatus(200);
});

const userRouter = require("./router/users");
const linkRouter = require("./router/linkedin");
const testRouter = require("./router/test");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", userRouter);
app.use("/", linkRouter);
app.use("/", testRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
