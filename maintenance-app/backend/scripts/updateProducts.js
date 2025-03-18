const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://localhost:27017/maintenance-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const updateProducts = async () => {
  try {
    const products = await Product.find({});
    
    for (let product of products) {
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          description: `Description détaillée pour ${product.labelle}`,
          image: `https://picsum.photos/seed/${product._id}/300/200`
        }
      });
    }
    
    console.log('Products updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating products:', error);
    mongoose.connection.close();
  }
};

updateProducts();