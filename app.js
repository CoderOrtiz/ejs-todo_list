const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be after "const app = express();"
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {todaysDate: day});

});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});