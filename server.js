const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cc_enterprises')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

const ItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
});
const Item = mongoose.model('Item', ItemSchema);

app.get('/api/inventory', async (req, res) => {
  try { res.json(await Item.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/inventory', async (req, res) => {
  try { res.status(201).json(await new Item(req.body).save()); } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/inventory/:id', async (req, res) => {
  try { res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try { await Item.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
