const express = require('express') ;

const router = express.Router() ;
const {getRoute, putRoute, postRoute, deleteRoute} = require('../controlllers/crudControllers')

router.get('/', getRoute)
router.post('/', postRoute)
router.put('/:id',putRoute )
router.delete('/', deleteRoute) ;



module.exports = router