require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log('Server en puerto', PORT));
  })
  .catch(err => console.error(err));
