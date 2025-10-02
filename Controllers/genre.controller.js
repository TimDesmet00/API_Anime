const Genre = require("../Models/genre.model");
const Anime = require("../Models/anime.model");

const createGenre = async (req, res) => {
  // Vérifier que la requête n'est pas vide
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Le contenu ne peut pas être vide.",
    });
  }

  try {
    // Créer un nouveau genre
    const genre = await Genre.create(req.body);
    res.status(201).json({
      status: "succès",
      data: {
        genre,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la création du genre.",
      error: error.message,
    });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      status: "succès",
      results: genres.length,
      data: {
        genres,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la récupération des genres.",
      error: error.message,
    });
  }
};

const updateGenre = async (req, res) => {
  // Vérifier que la requête n'est pas vide
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Le contenu ne peut pas être vide.",
    });
  }

  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!genre) {
      return res.status(404).send({
        message: "Genre non trouvé.",
      });
    }

    res.status(200).json({
      status: "succès",
      data: {
        genre,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la mise à jour du genre.",
      error: error.message,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).send({
        message: "Genre non trouvé.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la suppression du genre.",
      error: error.message,
    });
  }
};

const getAnimesByGenre = async (req, res) => {
  // Récupère tous les animes qui ont ce genre
  try {
    const animes = await Anime.find({ genre: req.params.id });
    res.status(200).json({
      status: "succès",
      results: animes.length,
      data: {
        animes,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la récupération des animes.",
      error: error.message,
    });
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  updateGenre,
  getAnimesByGenre,
};
