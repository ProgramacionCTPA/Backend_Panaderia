require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(express.json());

// 🧩 Forzar CORS manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://panaderia-aserri.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 🔗 Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// ⚙️ Conexión MongoDB y arranque del servidor
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log('Server en puerto', PORT));
  })
  .catch(err => console.error(err));
