const express = require('express');
const app = express();

const PORT = 3000;

const {generateToken, verifyToken} = require('./middlewares/authMiddleware');
const secreto = require('./crypto/config');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. Creamos la sesion con la clave secreta, 
//    se guardan cambios cuando se realice un cambio, no siempre. 
//    Se guarda el inicio de sesión y cambiar cookie a true si se sube a producción.
app.use(
    session({
      secret: secreto, 
      resave: false, 
      saveUninitialized: true, 
      cookie: { secure: false }, 
    }) 
  );

  app.use('/', router);

  app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en http://localhost${PORT}`)
  })

  