const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Listar productos
router.get('/', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.json(products);
});

// Crear producto
router.post('/', auth, admin, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Actualizar producto
router.put('/:id', auth, admin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Eliminar producto
router.delete('/:id', auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Producto eliminado' });
});

module.exports = router;
