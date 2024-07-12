const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
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
router.post('/recommend',(req,res)=>{
   const {product} = req.body;

   let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [JSON.stringify(product)],
   };

PythonShell.run('recommendation.py',options,(err, results)=>{
    if (err) throw err;
    res.json(JSON.parse(results));
});
});

   
 {/*   const product = new Product({
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
*/}

module.exports = router;