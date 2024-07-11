const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/empexchange',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open',()=> {
    console.log('Connected to MongoDB');
});

app.listen(port, ()=>{
    console.log('Server is running on port: ${port');
});

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);