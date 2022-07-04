const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Line 7 must be after "const app = express();"
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let today = new Date();
    let currentDay = today.getDay();
    let day = "";

    // The getDay() method returns the weekday as a number between 0 and 6.
    switch (currentDay) {
        
        case 0:
            day = "Sunday's";
            break;
        
        case 1:
            day = "Monday's";
            break;
        
        case 2:
            day = "Tuesday's";
            break;
    
        case 3:
            day = "Wednesday's";
            break;

        case 4:
            day = "Thursday's";
            break;

        case 5:
            day = "Friday's";
            break;

        case 6:
            day = "Satuday's";
            break;

        default:
            console.log("Error: Current day is equal to : " + currentDay);
    }

    res.render("list", {dayOfWeek: day});

});

app.listen(3000, function() {
    console.log("Server is Running on Port 3000");
});