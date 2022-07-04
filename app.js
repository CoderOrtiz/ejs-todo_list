const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be after "const app = express();"
app.use('view engine', 'ejs');

app.get("/", function (require, response) {

    let today = new Date();
    let currentDay = today.getDay();
    let day = "";


    if (currentDay === 6 || currentDay === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";
    }

    response.render("list", {kindOfDay: day});
    
});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});