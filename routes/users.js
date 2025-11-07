const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Obtener todos los usuarios
router.get('/', auth, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Eliminar un usuario
router.delete('/:id', auth, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado correctamente' });
});

module.exports = router;
