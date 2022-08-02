const express   = require('express')
const router    = express.Router();
const productController =  require("../controllers/productController")
const auth = require('../middleware/auth')

//all apis
router.post('/createProduct',productController.createProduct)
router.get('/getProduct',auth.isAuth,productController.getAllproduct)
router.get('/getProduct/:id',productController.getOneproduct)
router.put('/updateProduct/:id',productController.updateProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)


module.exports = router;