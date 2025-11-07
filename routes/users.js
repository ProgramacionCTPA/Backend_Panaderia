const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// ======================================
// 📋 Obtener todos los usuarios
// ======================================
router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
});

// ======================================
// ➕ Crear un nuevo usuario
// ======================================
router.post('/', auth, admin, async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Verifica si ya existe el correo
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'El correo ya está registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed, isAdmin });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Error al crear usuario' });
  }
});

// ======================================
// ✏️ Actualizar usuario existente
// ======================================
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const update = { name, email, isAdmin };

    // Si el admin escribe una nueva contraseña
    if (password && password.trim() !== '') {
      update.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Error al actualizar usuario' });
  }
});

// ======================================
// 🗑️ Eliminar usuario
// ======================================
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Error al eliminar usuario' });
  }
});

module.exports = router;
