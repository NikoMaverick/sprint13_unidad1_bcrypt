const jwt = require('jsonwebtoken');
const secreto = require('../crypto/config')

// 8. GENERAMOS EL TOKEN
function generateToken(user) {
    return jwt.sign({ user: user.id }, secreto,{ expiresIn: '1h' });
  };


  function verifyToken(req, res, next) {
    const token = req.session.token; 
    if (!token) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }
    jwt.verify(token, secreto, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: 'token no valido' });
      }
      req.user = decoded.user;
      next();
    });
  };

  module.exports = {generateToken, verifyToken}