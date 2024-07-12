const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured products (let's say the first 10 for now)
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find().limit(10);
    res.json(featuredProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Recommend products
router.post('/recommend', (req, res) => {
  const { product } = req.body;

  let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [JSON.stringify(product)],
  };

  PythonShell.run('recommendation.py', options, (err, results) => {
    if (err) throw err;
    res.json(JSON.parse(results));
  });
});

module.exports = router;