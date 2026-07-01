const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://new-user:test123@finalproject.ok1img2.mongodb.net/?appName=FInalProject');

const InventoryItem = mongoose.model('InventoryItem', {
    sku: String,
    name: String,
    category: String,
    quantity: Number,
    price: Number
});

app.post('/api/inventory', async (req, res) => {
    try {
        const item = new InventoryItem(req.body);
        await item.save();
        console.log("📦 Added new asset entry: ", item);
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/api/inventory', async (req, res) => {
    try {
        const list = await InventoryItem.find();
        console.log("🗂️ Fetched all inventory data entries");
        res.send(list);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/api/inventory/:id', async (req, res) => {
    try {
        const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).send({ error: 'Asset entry not found' });
        console.log("📝 Modified asset item details: ", item);
        res.send(item);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const item = await InventoryItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send({ error: 'Asset entry not found' });
        console.log(`🗑️ Removed entry ID: ${req.params.id} from the database`);
        res.send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(5000, () => console.log('Carl² Inventory API system running on port 5000'));
