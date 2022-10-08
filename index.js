const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const dbConnect = require("./utilis/dbConnect");
const toolsRoutes = require("./routes/v1/tools.route.js");
const viewCount = require("./middleware/viewCount");
const { default: rateLimit } = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
app.set("view engine", "ejs");

// middleware
// app.use(viewCount);

// Apply the rate limiting middleware to all requests
// app.use(limiter);

dbConnect();

app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
  res.render("Home.ejs", {
    id: 5,
    user: {
      name: "test",
    },
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);

app.all("*", (req, res) => {
  res.send("No Route found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
