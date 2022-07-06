// Loading in Express, Body Parser, and "Date" File
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// Renaming Express as "app"
const app = express();

// Making an Items & Work Arrays To Contain List Items
const items = [];
const workItems = [];

// Tells our App to Use EJS (Must be after "app = express()")
app.set("view engine", "ejs");

// Line 17 is Setting up Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Telling Express to use the Static Files within the Public Directory
// This will provide the CSS File to the Browser
app.use(express.static("public"));

app.get("/", function (req, res) {
  // This Calls on the getDate Function within the Date.JS File
  const day = date.getDate();
  // res.render uses the View Engine to Render a Particular Page.
  // Must have a views directory to use res.render, with an index.ejs File
  // Ref res.render, Express is going to look inside the folder, Views, for a file titled, "list"
  // The Key Value's within the Object will be sent to the file titled, "list"
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  // When a Post Request is Made, The Item's Array is Updated 
  const item = req.body.newItem;

  // This Logic is in Ref to "List.EJS", Under the Button Tag
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list.ejs", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is Running on Port 3000");
});