const express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
// ***************Add the css file here later**********
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Importing routes to server.
// var routes = require("./controllers/burgers_controller.js");

// app.use(routes);
app.get("/", function (req, res) {
  burger.selectAll(function (data) {
      var hbsObject = {
          burgers: data
      };
      console.log(hbsObject + " controllers - Ln19");
      res.render("index", hbsObject);
  });
});
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
