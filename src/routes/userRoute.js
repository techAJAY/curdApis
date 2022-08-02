const express   = require('express')
const router    = express.Router();
const userController = require("../controllers/userController")


//all apis
router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.get('/logOut',userController.logOut)


module.exports = router;