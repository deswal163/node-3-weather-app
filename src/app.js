const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hanlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shubham",
  });
});

app.get("/weather", (req, res) => {
  geocode(req.query.address, (error, { latitue, longitute, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(
      latitue,
      longitute,
      (error, { temperature, precipProbability, summary } = {}) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          temperature,
          precipProbability,
          summary,
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Shubham",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Shubham",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Shubham",
    title: "404",
    errorMessage: "Article Not Found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Shubham",
    title: "404",
    errorMessage: "Page Not Found.",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
