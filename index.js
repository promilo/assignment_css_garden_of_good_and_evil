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
const helpers = require('./helpers');
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  helpers: helpers.registered,
  partialsDir: 'views/'
}));
app.set("view engine", "handlebars");

// custom cart middleware
const cartMiddleware = require("./cart");

app.use(cartMiddleware);

const { allProducts } = require("./models/products");

// Route handlers
app.get("/", (req, res) => {
  const { cart } = req;
  let { name } = req.cookies;
  if (!name) name = "New User";
  res.render("index", { name, allProducts, cart });
});

app.post("/name", (req, res) => {

  // Success flash
  req.flash('success', `Name set to: ${ req.body.name }`);
  res.cookie("name", req.body.name);
  res.redirect("back");
});

app.post("/clear", (req, res) => {

  // Warning flash
  req.flash('warning', 'Cart cleared!');
  res.cookie("cart", {});
  res.redirect("back");
});

app.post("/cart", (req, res) => {

  // Info flash
  req.flash('Added!');
  const id = req.body.id;
  let cart = req.cookies.cart || {};
  if (cart[id]) {
    cart[id] += 1;
  } else {
    cart[id] = 1;
  }
  res.cookie("cart", cart);
  res.redirect("back");
});

app.get("/error", (req, res) => {

  // Error flash
  req.flash('error', 'Boom! :(');
  res.redirect('/');
});

// Listen on port 3000
app.listen(4200, () => {
  console.log("Listening!");
});
