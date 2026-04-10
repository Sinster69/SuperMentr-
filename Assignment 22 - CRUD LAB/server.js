const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://testuser:test123@ac-4828zwr-shard-00-00.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-01.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-02.tq2xaoj.mongodb.net:27017/?ssl=true&replicaSet=atlas-mutfgo-shard-0&authSource=admin&appName=Cluster0')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ ERROR:", err));

/* ================== CREATE ================== */
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* ================== READ ================== */
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

/* ================== UPDATE ================== */
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(user);
});

/* ================== DELETE ================== */
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});