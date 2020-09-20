const express = require('express');
const router = express.Router();

const rutasController = require('../controllers/rutasController');

//Aqui declaramos todas las rutas que utilizaremos
router.get('/', rutasController.inicio);

router.get('/personas', rutasController.listar);

router.get('/modelo', rutasController.showModel);

router.get('/entradas', rutasController.logins);

router.get('/delete/:id', rutasController.delete);

router.post('/add', rutasController.save);

router.post('/addlogin', rutasController.saveLogin);

//Importamos
module.exports = router;