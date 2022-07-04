const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (require, response) {

    let today = new Date();
    if (today.getDay() === )

    response.send("Hello World");
});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});