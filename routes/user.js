//CLASE QUE CONTIENE LAS RUTAS DE LAS DIRECCIONES WEBS QUE USA LA APLICACION EN EL MODULO USUARIOS

const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController'); 

router.get('/',userController.getUsers); //OBTIENE TODOS LOS USUARIOS
router.get('/:id',userController.getEspecifyUser); //OBTIENE UN USUARIO ESPECIFICO
router.post('/',userController.createUser);//CREA UN USUARIO
router.put('/:id',userController.updateUser);//ACTUALIZA UN USUARIO
router.delete('/:id',userController.deleteUser);//ELIMINA UN USUARIO

module.exports= router;