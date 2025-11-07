const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json(products);
});
router.post('/', auth, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});
router.put('/:id', auth, admin, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});
router.delete('/:id', auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Producto eliminado' });
});
module.exports = router;
