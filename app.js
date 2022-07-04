const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (require, response) {

    let today = new Date();
    let currentDay = today.getDay();


    if (currentDay === 6 || currentDay === 0) {
        response.write("<h1>Its the Weekend</h1>")
    } else {
        response.write("<p>It is not the weekend</p>")
        response.write("<h1>I have to work today.</h1>")
        response.send();
    }

    response.send("Hello World");
});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});