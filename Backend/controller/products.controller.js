const db = require("../models");
const Product = db.products;
const Trader = db.trader;

// Create a new product
exports.createProduct = async (req, res) => {

  
  try {
    const product = new Product(req.body);

    if (req.body.createdBy) {
      const trader = await Trader.findOne({ fname: req.body.createdBy });
      if (!trader) {
        return res.status(404).send({ message: "Trader not found." });
      }
      product.createdBy = trader._id;
    }

    const savedProduct = await product.save();
    if (!savedProduct) {
      return res.status(500).send({ message: "The product was not created." });
    }

    res.send({ message: "Product created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


  // Get products by createdBy
  exports.getProductsByCreatedBy = async (req, res) => {
    try {
      const createdBy = req.params.createdBy;
      const trader = await Product.findOne({ createdBy });
      if (!trader) {
        return res.status(404).json({ error: 'Trader not found' });
      }
      const products = await Product.find({ createdBy: trader.fname });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
    
   
  // Get all products
  exports.getAllProducts = async (req, res) => {
    try {
      let category = req.params.category;
      let condition = category ? {category: {$regex: new RegExp(category), $options: 'i' }} : {}
      const products = await Product.find(condition);
      // console.log(products)
      res.json(products);
    } catch (error) {

      res.status(500).json({ message:error.message });
    }
  };
  
  // Get a product by ID
  exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  
  // Update a product by ID
  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { p_name, price, description } = req.body;
      const product = await Product.findByIdAndUpdate(
        id,
        { p_name, price, description },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete a product by ID
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete all products
  exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany();
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };