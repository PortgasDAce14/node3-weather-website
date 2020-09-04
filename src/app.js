const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Apurv",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Apurv",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "Helpful page",
    name: "Apurv",
  });
});

app.get("/weather", ({ query }, res) => {
  if (!query.address) {
    return res.send({
      error: "Please put address",
    });
  }
  geocode(query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(longitude, latitude, (error, response) => {
      if (error) return res.send({ error });

      res.send({ location: location, forecast: response });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "Apurv",
    errorMsg: "404: Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "Apurv",
    errorMsg: "404: Page not Found",
  });
});

app.listen(port, () => {
  console.log("Server started");
});
