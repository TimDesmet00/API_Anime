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
app.use("/anime", require("./Router/anime.router"));
app.use("/studio", require("./Router/studio.router"));
app.use("/character", require("./Router/character.router"));

// Middleware pour routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ status: "erreur", message: "Route non trouvée" });
});

// Middleware gestion erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "erreur", message: "Une erreur serveur est survenue" });
});

app.listen(port, () => {
  console.log(`Le server est démarré sur le port: ${port}`);
});
