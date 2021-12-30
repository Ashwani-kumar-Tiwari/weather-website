const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000

// Dedine paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handelbar engine and views location
app.set("view engine", "hbs"); //handlebar template setup
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Home page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ashwani",
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Kuldeep",
  });
});

// Help Page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is some helpful text.",
    name: "Btixboj",
  });
});

// Weather Page
app.get("/weather", (req, res) => {
  //   res.send("Weather page");
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

// Help 404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kuldeep Kumar Tiwari",
    errorMessgae: "This help article does not exixt",
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ashwani Kumar Tiwari",
    errorMessgae: "This page does not exist",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
