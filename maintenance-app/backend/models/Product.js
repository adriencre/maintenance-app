
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  labelle: { type: String, required: true },
  prix: { type: Number, required: true },
  description: { type: String, default: 'Aucune description disponible' },
  image: { type: String, default: 'https://via.placeholder.com/150' },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);