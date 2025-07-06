const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Un titre est requis"],
  }, // Titre principal

  originalTitle: {
    type: String,
    required: [true, "Un titre original est requis"],
  }, // Titre original en japonais par ex.

  description: {
    type: String,
    required: [true, "Une description est requise"],
  }, // Résumé de l'anime,

  genres: {
    type: [String],
    required: [true, "Au moins un genre est requis"],
  }, // Ex: ['Isekai', 'Fantasy', 'Action']

  studios: {
    type: [mongoose.Schema.Types.ObjectId],
  }, // Référence aux studios (liens)

  releaseDate: {
    type: Date,
  }, // Date de sortie (format ISO)

  episodes: {
    type: Number,
    required: [true, "Le nombre d'épisodes est requis"],
  }, // Nombre total d'épisodes

  status: {
    type: String,
    enum: ["En cours", "Terminé", "À venir", "Abandonné"],
    required: [true, "Un statut est requis"],
  }, // 'En cours', 'Terminé', 'À venir', etc.

  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  }, // Note perso ou moyenne sur 10

  tags: {
    type: [String],
  }, // Pour affiner les recherches (ex: 'dark', 'romance', 'waifu')

  slug: {
    type: String,
    unique: true,
    required: [true, "Un slug est requis pour l'URL et l'affichage"],
  },

  poster: {
    type: String, // URL vers l'image de couverture
  },

  favoriteCharacters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Character", // Référence aux personnages favoris (liens)
  }, // Référence aux persos favoris (waifus, etc.)

  createdAt: {
    type: Date,
    default: Date.now,
  }, // Date de création du document

  updatedAt: {
    type: Date,
    default: Date.now,
  }, // Date de dernière mise à jour
});

// 💡 Middleware pour mettre à jour automatiquement le champ `updatedAt`
AnimeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Anime", AnimeSchema);
