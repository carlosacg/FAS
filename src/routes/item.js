//CLASE QUE CONTIENE LAS RUTAS DE LAS DIRECCIONES WEBS QUE USA LA APLICACION EN EL MODULO USUARIOS

const express = require('express');
const router = express.Router();
const itemController=require('../controllers/itemController'); 

router.get('/',itemController.getItems); //OBTIENE TODOS LOS USUARIOS
router.get('/:id',itemController.getEspecifyItem); //OBTIENE UN USUARIO ESPECIFICO
router.post('/',itemController.createItem);//CREA UN USUARIO
router.put('/:id',itemController.updateItem);//ACTUALIZA UN USUARIO
router.delete('/:id',itemController.deleteItem);//ELIMINA UN USUARIO

module.exports= router;