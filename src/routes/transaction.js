//CLASE QUE CONTIENE LAS RUTAS DE LAS DIRECCIONES WEBS QUE USA LA APLICACION EN EL MODULO USUARIOS

const express = require('express');
const router = express.Router();
const transactionController=require('../controllers/transactionController'); 

router.get('/',transactionController.getTransactions); //OBTIENE TODOS LOS USUARIOS
router.get('/:id',transactionController.getEspecifyTransaction); //OBTIENE UN USUARIO ESPECIFICO
router.post('/',transactionController.createTransaction);//CREA UN USUARIO
router.put('/:id',transactionController.updateTransaction);//ACTUALIZA UN USUARIO
router.delete('/:id',transactionController.deleteTransaction);//ELIMINA UN USUARIO

module.exports= router;