const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/empexchange', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.post('/products/recommend', (req, res) => {
  const product = req.body.product;
  console.log('Received product for recommendation:', product);

  let options = {
    mode: 'json',
    args: [JSON.stringify(product)]
  };

  PythonShell.run('recommendation.py', options, function (err, results) {
    if (err) {
      console.error(`Error generating recommendations: ${err}`);
      return res.status(500).send(`Error generating recommendations: ${err}`);
    }
    console.log('Results from Python script:', results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
