var express = require('express');
var router = express.Router();
var productController = require('../Controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:categoryId', productController.getByCategoryId);
router.get('/', productController.getByCategoryId);
router.post('/', productController.postProduct);
//getByArrayCategory
module.exports = router;





