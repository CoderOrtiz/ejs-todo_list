const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be after "const app = express();"
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let today = new Date();
    let currentDay = today.getDay();
    let day = "";


    if (currentDay === 6 || currentDay === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";
    }

    res.render("list", {kindOfDay: day});

});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});