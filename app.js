const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be after "const app = express();"
app.set('view engine', 'ejs');

let day = "";

app.get("/", function (req, res) {

    // The getDay() method returns the weekday as a number between 0 and 6.
    switch (new Date().getDay()) {
        
        case 0:
            day = "Today is Sunday";
            break;
        
        case 1:
            day = "Today is Monday";
            break;
        
        case 2:
            day = "Today is Tuesday";
            break;
    
        case 3:
            day = "Today is Wednesday";
            break;

        case 4:
            day = "Today is Thursday";
            break;

        case 5:
            day = "Today is Friday";
            break;

        case 6:
            day = "Today is Satuday";
            break;
    }

    res.render("list", {kindOfDay: day});

});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});