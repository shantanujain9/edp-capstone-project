const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// Get all products
router.get('/',async(req, res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

// Create a new product
router.post('/',async(req,res)=>{
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.escription,
        image: req.body.image,
        popularity: req.body.popularity,
        durability: req.body.durability,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;