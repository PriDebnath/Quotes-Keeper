require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port =  process.env.PORT || 8000 ;
const hostname =  process.env.HOSTNAME || "localhost";
const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express()
app.use(cors());
app.use(express.json());


mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log("Not connected to database");
  });

//  Defining schema

const quoteSchema = mongoose.Schema({
  quote_author: String,
  quote_text: String,
  quote_media : Object , 
});

// Creating model, it will generate a collection in database

const quoteModel = mongoose.model("quote", quoteSchema);


// Setting all routes

app.get("/quote", async (req, res) => {
  const data = await quoteModel.find();
  if (data) { 
    res.send(data);
   console.log(data);
  }
});

app.post("/quote", async (req, res) => {
  const { title, quoteText } = req.body;

  if (title && quoteText) {
    const newquote = new quoteModel({
      title: title,
      quoteText: quoteText,
    });
    newquote
      .save()
      .then((data) => {
        console.log("data saved");
      })
      .catch((error) => {
        res.status(400).send("Bad request");
        //  console.log(error);
      });

    res.json(newquote);
    console.log("saved");
  } else {
    res.status(400).send("something missing");
    //  console.log("something missing");
  }
});

app.put("/quote/:_id", async (req, res) => {
  if (req.params._id && req.body) {
    const { _id } = req.params;
    await quoteModel.updateOne(
      { _id: _id },
      {
        title: req.body.title,
        quoteText: req.body.quoteText,
      }
    );
    res.send("updated");
    console.log("updated");
  } else {
    res.status(400).send("something");
  }
});

app.delete("/quote/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const deletedquote = await quoteModel.deleteOne({ _id: id });
  console.log("data deleted");
  res.json(deletedquote);
});


app.listen(port,  () => {
  console.log("Running on - " + hostname + port);
});
