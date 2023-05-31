const express   = require('express')
const router    = express.Router();
const productController =  require("../controllers/productController")
const {isAuth} = require('../middleware/auth')

//all apis
router.post('/createProduct',isAuth,productController.createProduct)
router.get('/getProduct',productController.getAllproduct)
router.get('/getProduct/:id',isAuth,productController.getOneproduct)
router.put('/updateProduct/:id',isAuth,productController.updateProduct)
router.delete('/deleteProduct/:id',isAuth,productController.deleteProduct)


module.exports = router;
