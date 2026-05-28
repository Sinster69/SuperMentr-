const mongoose = require('mongoose');

const connect = async (uri) => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connect };
