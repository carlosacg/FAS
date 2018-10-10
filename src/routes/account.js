//CLASE QUE CONTIENE LAS RUTAS DE LAS DIRECCIONES WEBS QUE USA LA APLICACION EN EL MODULO USUARIOS

const express = require('express');
const router = express.Router();
const accountController=require('../controllers/accountController'); 

router.get('/',accountController.getAccounts); //OBTIENE TODOS LOS USUARIOS
router.get('/:id',accountController.getEspecifyAccount); //OBTIENE UN USUARIO ESPECIFICO
router.post('/',accountController.createAccount);//CREA UN USUARIO
router.put('/:id',accountController.updateAccount);//ACTUALIZA UN USUARIO
router.delete('/:id',accountController.deleteAccount);//ELIMINA UN USUARIO

module.exports= router;