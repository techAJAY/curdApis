const express   = require('express')
const router    = express.Router();
const productController =  require("../controllers/productController")


//all apis
router.post('/createProduct',productController.createProduct)
router.get('/getProduct',productController.getAllproduct)
router.get('/getProduct/:id',productController.getOneproduct)
router.put('/updateProduct/:id',productController.updateProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)


module.exports = router;