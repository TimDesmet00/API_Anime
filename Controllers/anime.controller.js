const Anime = require("../Models/anime.model");
const uploadImage = require("../Utils/uploadImage");
const Character = require("../Models/character.model");
const studios = require("../Models/studio.model");
const Genre = require("../Models/genre.model");

const createAnime = async (req, res) => {
  // Vérifier que la requête n'est pas vide
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Le contenu ne peut pas être vide.",
    });
  }

  try {
    let posterUrl = null;
    if (req.body.poster) {
      // Upload de l'image sur Cloudinary
      const uploadResult = await uploadImage(req.body.poster);
      posterUrl = uploadResult.secure_url; // URL sécurisée retournée
    }
    // Créer un nouvel anime
    const anime = await Anime.create({
      ...req.body,
      poster: posterUrl || req.body.poster,
    });
    res.status(201).json({
      status: "succès",
      data: {
        anime,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la création de l'anime",
    });
  }
};

const getAllAnimes = async (req, res) => {
  const filters = {}; // pour plus tard
  try {
    const animes = await Anime.find(filters)
      .populate("studios")
      .populate("favoriteCharacters");
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération des animes.",
    });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id)
      .populate("studios")
      .populate("favoriteCharacters");
    if (!anime) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun anime trouvé avec cet identifiant.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: {
        anime,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération de l'anime.",
    });
  }
};

const updateAnime = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    if (req.body.poster) {
      // Upload de la nouvelle image sur Cloudinary
      const uploadResult = await uploadImage(req.body.poster);
      updatedData.poster = uploadResult.secure_url;
    }

    const anime = await Anime.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    })
      .populate("studios")
      .populate("favoriteCharacters");
    if (!anime) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun anime trouvé avec cet identifiant.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: {
        anime,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la mise à jour de l'anime.",
    });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun anime trouvé avec cet identifiant.",
      });
    }
    res.status(204).json({
      status: "succès",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la suppression de l'anime.",
    });
  }
};

const getAnimesByStudio = async (req, res) => {
  try {
    const studioId = req.params.studioId;
    const animes = await Anime.find({ studios: studioId })
      .populate("studios")
      .populate("favoriteCharacters");
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération des animes.",
    });
  }
};

const getAnimesByGenre = async (req, res) => {
  // Récupère tous les animes qui ont ce genre
  try {
    const animes = await Anime.find({ genre: req.params.id })
      .populate("studios")
      .populate("favoriteCharacters");
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Une erreur est survenue lors de la récupération des animes.",
      error: error.message,
    });
  }
};

const searchAnimes = async (req, res) => {
  // Recherche d'animes par titre (partiel, insensible à la casse)
  try {
    const animes = await Anime.find({
      title: { $regex: req.params.title, $options: "i" },
    });
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Une erreur est survenue lors de la recherche des animes.",
      error: error.message,
    });
  }
};

const getAnimesByStatus = async (req, res) => {
  // Récupère tous les animes qui ont ce statut
  try {
    const animes = await Anime.find({ status: req.params.status });
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Une erreur est survenue lors de la récupération des animes.",
      error: error.message,
    });
  }
};

const getAnimesByStatus = async (req, res) => {
  // Récupère tous les animes qui ont ce statut
  try {
    const animes = await Anime.find({ status: req.params.status });
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Une erreur est survenue lors de la récupération des animes.",
      error: error.message,
    });
  }
};

module.exports = {
  createAnime,
  getAllAnimes,
  getAnimeById,
  getAnimesByGenre,
  updateAnime,
  deleteAnime,
  getAnimesByStudio,
  searchAnimes,
  getAnimesByStatus,

  // Add more functions as needed
  // e.g., searchAnimes, getAnimesByStudio, etc.
};
