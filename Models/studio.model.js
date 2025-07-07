const mongoose = require("mongoose");

const StudioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom du studio est requis"],
    unique: true,
    trim: true,
  },
  country: {
    type: String,
    default: "Inconnu",
  },
  foundedYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear(),
  },
  description: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/.test(
          v
        );
      },
      message: (props) => `${props.value} n'est pas une URL valide!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pour mettre à jour updatedAt à chaque save
StudioSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Studio", StudioSchema);
