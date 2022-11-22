const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');
// const { Op } = require('sequelize');



// Configurar los routers (IMPORTARLAS Y CONFIGUARLAS!)
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);


module.exports = router;
