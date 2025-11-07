const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();
(async ()=>{
  await mongoose.connect(process.env.MONGODB_URI);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin1234', salt);
  const admin = new User({ name: 'Admin', email: 'admin@panaderia.com', password: hash, isAdmin: true });
  await admin.save();
  console.log('Admin creado');
  process.exit();
})();
