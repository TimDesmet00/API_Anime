const Studio = require("../Models/studio.model");

// Créer un nouveau studio
const createStudio = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "erreur",
      message: "Le contenu ne peut pas être vide.",
    });
  }

  try {
    const studio = await Studio.create(req.body);
    res.status(201).json({
      status: "succès",
      data: { studio },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la création du studio.",
    });
  }
};

// Récupérer tous les studios
const getAllStudios = async (req, res) => {
  try {
    const studios = await Studio.find();
    res.status(200).json({
      status: "succès",
      results: studios.length,
      data: { studios },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération des studios.",
    });
  }
};

// Récupérer un studio par ID
const getStudioById = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun studio trouvé avec cet identifiant.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: { studio },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la récupération du studio.",
    });
  }
};

// Mettre à jour un studio
const updateStudio = async (req, res) => {
  try {
    const studio = await Studio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!studio) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun studio trouvé avec cet identifiant.",
      });
    }
    res.status(200).json({
      status: "succès",
      data: { studio },
    });
  } catch (error) {
    res.status(400).json({
      status: "erreur",
      message:
        error.message ||
        "Une erreur s'est produite lors de la mise à jour du studio.",
    });
  }
};

// Supprimer un studio
const deleteStudio = async (req, res) => {
  try {
    const studio = await Studio.findByIdAndDelete(req.params.id);
    if (!studio) {
      return res.status(404).json({
        status: "erreur",
        message: "Aucun studio trouvé avec cet identifiant.",
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
        "Une erreur s'est produite lors de la suppression du studio.",
    });
  }
};

module.exports = {
  createStudio,
  getAllStudios,
  getStudioById,
  updateStudio,
  deleteStudio,
};
