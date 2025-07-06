const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const studioController = require("../Controllers/studio.controller");

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

// Routes RESTful pour studios
router.post("/", studioController.createStudio);
router.get("/", studioController.getAllStudios);
router.get("/:id", validateObjectId, studioController.getStudioById);
router.patch("/:id", validateObjectId, studioController.updateStudio);
router.delete("/:id", validateObjectId, studioController.deleteStudio);

module.exports = router;
