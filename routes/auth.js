const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ msg: 'Email ya registrado' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.json({ msg: 'Usuario creado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales invalidas' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales invalidas' });
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;
