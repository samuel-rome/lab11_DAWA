//Rutas producto
const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');

//api/locales
router.post('/', localController.crearLocal);
router.get('/', localController.obtenerLocal);
router.get('/:id', localController.verLocal);


module.exports = router;