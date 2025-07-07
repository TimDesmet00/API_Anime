const express = require("express");
const router = express.Router();
const characterController = require("../Controllers/character.controller");
const mongoose = require("mongoose");

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

// Routes RESTful pour personnages
router.post("/", characterController.createCharacter);
router.get("/", characterController.getAllCharacters);
router.get("/:id", validateObjectId, characterController.getCharacterById);
router.patch("/:id", validateObjectId, characterController.updateCharacter);
router.delete("/:id", validateObjectId, characterController.deleteCharacter);

module.exports = router;
