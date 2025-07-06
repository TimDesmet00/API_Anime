const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const animeController = require("../Controllers/anime.controller");

// Middleware pour valider l'ID MongoDB dans params
function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "erreur",
      message: "Identifiant invalide.",
    });
  }
  next();
}

// Routes RESTful
router.post("/", animeController.createAnime);
router.get("/", animeController.getAllAnimes);
router.get("/:id", validateObjectId, animeController.getAnimeById);
router.patch("/:id", validateObjectId, animeController.updateAnime);
router.delete("/:id", validateObjectId, animeController.deleteAnime);

module.exports = router;
