//CLASE QUE CONTIENE LAS RUTAS DE LAS DIRECCIONES WEBS QUE USA LA APLICACION EN EL MODULO USUARIOS

const express = require('express');
const router = express.Router();
const budgetController=require('../controllers/budgetController'); 

router.get('/',budgetController.getBudgets); //OBTIENE TODOS LOS USUARIOS
router.get('/:id',budgetController.getEspecifyBudget); //OBTIENE UN USUARIO ESPECIFICO
router.post('/',budgetController.createBudget);//CREA UN USUARIO
router.put('/:id',budgetController.updateBudget);//ACTUALIZA UN USUARIO
router.delete('/:id',budgetController.deleteBudget);//ELIMINA UN USUARIO

module.exports= router;