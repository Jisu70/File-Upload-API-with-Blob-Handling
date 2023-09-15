// Dependecies
const express = require('express') ;
const router = express.Router() ;
// Controller 
const {getRoute, putRoute, postRoute, deleteRoute} = require('../controlllers/crudControllers')

router.get('/', getRoute)
router.post('/', postRoute)
router.put('/:id',putRoute )
router.delete('/:id', deleteRoute) ;


//Expoting router 
module.exports = router