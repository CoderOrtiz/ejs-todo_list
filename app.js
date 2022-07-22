// Loading in Express, Body Parser, mongoose, and lodash
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

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
mongoose.connect("mongodb+srv://CoderOrtiz:eD9smw0q03kERXGt@cluster0.ps36b.mongodb.net/todolistDB");

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
const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


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

// Using Express Route Parameters
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if(!foundList) {
        // Create a new List
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // Show an existing List
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    } 
  });
});

app.post("/", function (req, res) {
  // When a Post Request is Made, The item (within list.ejs File) is saved and we are now saving that value
  // saving that value under itemName
  const itemName = req.body.newItem;
  const listName = req.body.list;

  // Using the Item Model
  const item = new Item ({
    name: itemName
  });

if (listName === "Today") {
  item.save();
  res.redirect("/");
} else {
  List.findOne({name: listName}, function (err, foundList){
    foundList.items.push(item);
    foundList.save();
    res.redirect("/" + listName);
  });
}
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

// For Heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("The Server has started successfully!");
});