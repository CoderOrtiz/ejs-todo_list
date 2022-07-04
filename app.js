const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be before "const app = express();"
app.use("view engine", "ejs");

app.get("/", function (require, response) {

    let today = new Date();
    let currentDay = today.getDay();
    let day = "";


    if (currentDay === 6 || currentDay === 0) {
        response.write("<h1>Its the Weekend</h1>")
    } else {
        // response.write("<p>It is not the weekend</p>")
        // response.write("<h1>I have to work today.</h1>")
        // response.send();

        // Instead of writing lines 18 - 20 you can right the code below.

        response.sendFile(__dirname + "/index.html");
    }
});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});