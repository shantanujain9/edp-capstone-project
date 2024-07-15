const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');
const Product = require('../models/Product');

// Get all products or filter by category or search query
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    popularity: req.body.popularity,
    durability: req.body.durability,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
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

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Recommend products
router.post('/recommend', (req, res) => {
  const product = req.body.product;
  console.log('Received product for recommendation:', product);

  let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [JSON.stringify(product)],
  };

  PythonShell.run('recommendation.py', options, function (err, results) {
    if (err) {
      console.error(`Error generating recommendations: ${err}`);
      return res.status(500).send(`Error generating recommendations: ${err}`);
    }
    console.log('Results from Python script:', results);
    res.json(JSON.parse(results[0]));
  });
});

module.exports = router;
