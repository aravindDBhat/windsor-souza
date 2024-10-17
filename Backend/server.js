const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "https://windsor-souza-i5cx.vercel.app",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "https://windsor-souza-i5cx.vercel.app",
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static(path.join(__dirname, "../Frontend")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "windsoresouza",
});

db.connect((err) => {
  if (err) {
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

app.post("/submit-form", (req, res) => {
  const {
    Name,
    Email,
    Role,
    Message,
    MarketingEmails,
    NewsUpdatesEmails,
    ProductionProcessEmails,
  } = req.body;

  const query = `INSERT INTO formdata (Name, Email, Role, Message, MarketingEmails, NewsUpdatesEmails, ProductionProcessEmails) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      Name,
      Email,
      Role,
      Message,
      MarketingEmails,
      NewsUpdatesEmails,
      ProductionProcessEmails,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        return res.status(500).send("Form data not submitted");
      }
      res.status(200).send("Form data submitted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
