const app = require("express")();

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));


// ----------------------------------------
// Flash Messages
// ----------------------------------------
var flash = require('express-flash-messages');
app.use(flash());

// Set up handlebars
const exphbs = require("express-handlebars");
// const helpers = require('./helpers');
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  // helpers: helpers.registered,
  partialsDir: 'views/'
}));
app.set("view engine", "handlebars");

// custom cart middleware


// app.use(cartMiddleware);


// Route handlers
app.get("/", (req, res) => {
  console.log(req.cookies)
  var judgement = req.cookies.judgement
  var favFood = req.cookies.favFood
  var cuisine = req.cookies.cuisine
  var insanity = req.cookies.insanity
  res.render("index", {judgement, favFood, cuisine, insanity});
});

app.post("/update", (req, res) => {
  console.log(req.body)
  var judgement = req.body.goodorevil
  console.log("judgement before convert", judgement)
  if (judgement === 'evil') {
    console.log("it passes")
    judgement = 'red'
  } else {
    judgement = 'blue'
  }

  console.log(judgement)

  var favFood = req.body.food
  var cuisine = req.body.cuisine
  var insanity = req.body.insanity
  res.cookie("judgement", judgement)
  res.cookie("favFood", favFood)
  res.cookie("cuisine", cuisine)
  res.cookie("insanity", insanity)

  res.redirect("/")

});


// Listen on port 3000
app.listen(4200, () => {
  console.log("Listening!");
});
