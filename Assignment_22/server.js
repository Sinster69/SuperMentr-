const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crudDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

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