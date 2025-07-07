const Character = require("../Models/character.model");

const createCharacter = async (req, res) => {
  // Vérifier que la requête n'est pas vide
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Le contenu ne peut pas être vide.",
    });
  }

  try {
    // Créer un nouveau personnage
    const character = await Character.create(req.body);
    res.status(201).json({
      status: "succès",
      data: {
        character,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la création du personnage",
    });
  }
};

const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find().populate("anime");
    res.status(200).json({
      status: "succès",
      results: characters.length,
      data: {
        characters,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération des personnages.",
    });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).populate("anime");
    if (!character) {
      return res.status(404).json({
        status: "erreur",
        message: "Personnage non trouvé.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: {
        character,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération du personnage.",
    });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("anime");
    if (!character) {
      return res.status(404).json({
        status: "erreur",
        message: "Personnage non trouvé.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: {
        character,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la mise à jour du personnage.",
    });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      return res.status(404).json({
        status: "erreur",
        message: "Personnage non trouvé.",
      });
    }
    res.status(204).json({
      status: "succès",
      message: "Personnage supprimé avec succès.",
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la suppression du personnage.",
    });
  }
};

module.exports = {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
