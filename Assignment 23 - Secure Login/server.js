const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// DB connection
mongoose.connect('mongodb://testuser:test123@ac-4828zwr-shard-00-00.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-01.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-02.tq2xaoj.mongodb.net:27017/?ssl=true&replicaSet=atlas-mutfgo-shard-0&authSource=admin&appName=Cluster0')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ ERROR:", err));

/* ================== SIGNUP ================== */
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.send("User registered successfully");

    } catch (err) {
        res.status(500).send(err);
    }
});

/* ================== LOGIN ================== */
app.post('/login', async (req, res) => {
    try {
        console.log("Request body:", req.body); // 👈 ADD THIS

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log("User found:", user); // 👈 ADD THIS

        if (!user) {
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (err) {
        console.log("ERROR:", err); // 👈 THIS IS KEY
        res.status(500).send("Server error");
    }
});

/* ================== PROTECTED ROUTE ================== */
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send("Access denied");

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        res.send("Welcome to dashboard " + verified.userId);
    } catch (err) {
        res.status(400).send("Invalid token");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));