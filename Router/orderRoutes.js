var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController.js');

//postOrder
router.get('/:userId', orderController.getOrdersByUserId);
router.post('/',orderController.postOrder);

module.exports = router;
