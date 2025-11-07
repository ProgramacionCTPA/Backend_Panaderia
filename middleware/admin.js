module.exports = function (req, res, next) {
  if (!req.user || req.user.isAdmin !== true) {
    return res.status(403).json({ msg: 'Acceso solo para administradores' });
  }
  next();
};
