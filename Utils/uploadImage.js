const cloudinary = require("../Config/cloudinary");

async function uploadImage(imagePathOrUrl, publicId = null) {
  try {
    const options = {};
    if (publicId) {
      options.public_id = publicId;
    }
    const result = await cloudinary.uploader.upload(imagePathOrUrl, options);
    return result; // Tu peux récupérer url, public_id, etc.
  } catch (error) {
    console.error("Erreur upload image:", error);
    throw error;
  }
}

module.exports = uploadImage;
