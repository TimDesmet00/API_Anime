const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom du personnage est requis"],
    unique: true, // Assure que le nom est unique
  }, // Nom du personnage principal

  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime", // Référence à l'anime auquel appartient le personnage
    required: [true, "L'anime associé est requis"],
  }, // Référence à l'anime

  role: {
    type: String,
    enum: ["Protagoniste", "Antagoniste", "Waifu", "Support", "Autre"],
    required: [true, "Le rôle du personnage est requis"],
  }, // 'Protagoniste', 'Antagoniste', 'Waifu', etc.

  description: {
    type: String,
    required: [true, "Une description du personnage est requise"],
  },

  image: {
    type: String,
  }, // URL ou chemin d'image

  traits: {
    type: [String],
    enum: ["Kawaii", "Forte", "Mystérieuse", "Drôle", "Sérieuse", "Autre"],
    default: [], // Liste des traits de caractère
  }, // Ex: ['Kawaii', 'Forte', 'Mystérieuse']

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  }, // Date de dernière mise à jour
});

// Middleware pour mettre à jour updatedAt à chaque save
CharacterSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Character", CharacterSchema);
