const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { connect } = require('./config/db');
const User = require('./models/User');

dotenv.config();

const run = async () => {
  await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/roleguard');
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.findOneAndUpdate(
    { email: adminEmail },
    { email: adminEmail, password: hashed, role: 'ADMIN' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('Seeded admin user:', adminEmail);
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
