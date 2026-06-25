require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://20225469_db_user:yYaBoJJHhb4O6KEn@pokemondb.quwjqjd.mongodb.net/InventoryDB")
  .then(() => console.log('Connected to MongoDB Cloud Atlas successfully!'))
  .catch(err => console.error('Database connection error:', err));

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: [0, 'Stock cannot be negative'] },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

app.post('/api/inventory', async (req, res) => {
  try {
    const item = new Product(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const items = await Product.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const updatedItem = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item successfully removed from tracking' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`API Server actively running on port ${PORT}`));