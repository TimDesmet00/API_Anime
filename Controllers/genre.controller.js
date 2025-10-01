const Genre = require("../Models/genre.model");

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

module.exports = {
  createGenre,
  getAllGenres,
  updateGenre,
};
