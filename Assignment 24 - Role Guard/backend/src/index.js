const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('express').json;
const { connect } = require('./config/db');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT || 4000;
connect(process.env.MONGO_URI || 'mongodb://localhost:27017/roleguard')
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
