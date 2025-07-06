const express = require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = 5000;
connectdb();
const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:8000", // Remplacez par l'origine que vous souhaitez autoriser
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ajout des routes
// app.use());

app.listen(port, () => {
  console.log(`Le server est démarré sur le port: ${port}`);
});
