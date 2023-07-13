const config = require("../config/auth.config");
const db = require("../models");
const Trader = db.trader;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require("dotenv").config();

// ------------------


// const router = require("express").Router();
// const User = require("../models/User");

// const {
//   verifyTokenAndAuthorization,
//   verifyToken,
// } = require("../middlewear/verifyToken");
// const product = require("../models/Product");

// -----------------



// Function to generate and sign a JWT token
function generateToken(userId) {
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
}

// Create a new trader
exports.createTrader = async (req, res) => {
  try {
    const { fname, cell, businessName, address, image, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const trader = new Trader({
      fname,
      cell,
      businessName,
      address,
      image,
      email,
      password: hashedPassword
    });

    await trader.save();
    console.log(trader)
    res.status(201).json(trader);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Trader signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the trader by email
    const trader = await Trader.findOne({ email });

    if (!trader) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, trader.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for the authenticated trader
    const token = generateToken(trader._id);

    res.status(200).json({
      id: trader._id,
      email: trader.email,
      fname: trader.fname,
      businessName: trader.businessName,
      address: trader.address,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all traders
exports.getAllTraders = async (req, res) => {
  try {
    const traders = await Trader.find();
    res.json(traders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a trader by ID
exports.getTraderById = async (req, res) => {
  try {
    const { id } = req.params;
    const trader = await Trader.findById(id);
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json(trader);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a trader by ID
exports.updateTrader = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, fname, businessName, address } = req.body;
    const trader = await Trader.findByIdAndUpdate(
      id,
      { email, password, fname, businessName, address },
      { new: true }
    );
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json(trader);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a trader by ID
exports.deleteTrader = async (req, res) => {
  try {
    const { id } = req.params;
    const trader = await Trader.findByIdAndDelete(id);
    if (!trader) {
      return res.status(404).json({ error: 'Trader not found' });
    }
    res.json({ message: 'Trader deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete all traders
exports.deleteAllTraders = async (req, res) => {
  try {
    await Trader.deleteMany();
    res.json({ message: 'All traders deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TRADER INVENTORY

// Create a Product
exports.createInventoryProduct = async (req, res) => {
  
    const trader = await Trader.findById(req.traders._id);
    // product info
    var productId = req.product._id;
    var productTitle = req.products.productTitle;
    var productCategory = req.products.productCategory;
    var productDescription = req.products.productDescription;
    var productImage = req.products.productImage;
    var productPrice = req.products.productPrice;
    var productColor = req.products.productColor;
    var productSize = req.products.productSize;
    var productQuantity = req.body;
    var createdBy = req.user._id;

    try {
   const traderinventory = new Trader.Inventory.push({
        productId,
        productTitle,
        productCategory,
        productDescription,
        productImage,
        productPrice,
        productColor,
        productSize,
        productQuantity,
        createdBy,
      });

      const inventory = await Trader.Inventory.save();

      console.log(inventory);
      res.status(200).json(inventory);
    } catch (err) {
      res.status(500).json(err);
    }
  }
