// Loading in Express, Body Parser, and "Date" File
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Renaming Express as "app"
const app = express();

// Tells our App to Use EJS (Must be after "app = express()")
app.set("view engine", "ejs");

// Line 17 is Setting up Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Telling Express to use the Static Files within the Public Directory
// This will provide the CSS File to the Browser
app.use(express.static("public"));

// Connects to MongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema ({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your ToDo List"
});

const item2 = new Item ({
  name: "<-- Hit this to Cross Off an Item"
});

const defaultItems = [item1, item2];



app.get("/", function (req, res) {

  // Means Find Everything within The Items Collection
  Item.find({}, function(err, foundItems){

    // If foundItems is 0
    if (foundItems.length === 0) {
      // Then the defaultItems array will be executed
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved Default Items to DataBase.");
        }
      });
      // and the user will be redirected to the home page where the defaultItems will be displayed
      res.redirect("/");
      
      // If not 0, then foundItems will be displayed
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  // When a Post Request is Made, The item (within list.ejs File) is saved and we are now saving that value
  // saving that value under itemName
  const itemName = req.body.newItem;

  // Using the Item Model
  const item = new Item ({
    name: itemName
  });
  // Automaticaly saving the item value
  item.save();

  // Once saved, we redirect the user to the home route (app.get("/"))
  res.redirect("/");
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
  console.log("The Server is Running on Port 3000");
});