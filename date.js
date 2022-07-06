// This Function / Object has Been Placed in its Own File, 
// As This is not Strictly Related to the Routing of Data.
// This declutters the App.JS File.

// Allows getDate to be Exported to App.JS
module.exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const day = today.toLocaleDateString("en-US", options);

  return day;
};