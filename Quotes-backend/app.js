require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME || "localhost";
const CONNECTION_URL = process.env.CONNECTION_URL;
 
const app = express();
app.use(cors());
app.use(express.json({ strict: false }));

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log({ e });
    console.log("Not connected to database");
  });

//  Defining schema

const quoteSchema = mongoose.Schema({
  quote_author: String,
  quote_text: String,
  created_at: Number,
  modified_at: Number,
});

// Creating model, it will generate a collection in database

const quoteModel = mongoose.model("quote", quoteSchema);

// Setting all routes

app.get("/", async (req, res) => {
  console.log("client came");

  const data = await quoteModel.find();
  if (data) {
    res.send(data);
  }
});

app.get("/quotes", async (req, res) => {
  const data = await quoteModel.find();
  if (data) {
    res.send(data);
  }
});

app.post("/quote", async (req, res) => {
  const { quote_author, quote_text } = req.body;

  if (quote_author && quote_text) {
    const newquote = new quoteModel({
      quote_author: quote_author,
      quote_text: quote_text,
      created_at: new Date().getTime(),
      modified_at: new Date().getTime(),
    });
    newquote
      .save()
      .then((data) => {
        res.status(201).send(data);
        console.log("data saved", data);
      })
      .catch((error) => {
        res.status(400).send("Bad request");
      });
  } else {
    res.status(400).send("something missing ...");
    console.log("something missing");
  }
});

app.put("/quote/:_id", async (req, res) => {
  if (req.params._id && req.body) {
    const { quote_author, quote_text, quote_media } = req.body;

    let updatedQuote = await quoteModel.findByIdAndUpdate(
      { _id: req.params._id },
      {
        quote_author: quote_author,
        quote_text: quote_text,
        quote_media: quote_media,
        modified_at: new Date().getTime(),
      },
      {
        returnOriginal: false,
      }
    );
    res.send(updatedQuote);
    console.log("updated", updatedQuote);
  } else {
    res.status(400).send("something ");
  }
});

app.delete("/quote/:_id", async (req, res) => {
  const { _id } = req.params;

  const deletedquote = await quoteModel.deleteOne({ _id: _id });
  res.json(req.params);
});

app.listen(port, () => {
  console.log("Running on - " + hostname + port);
});
