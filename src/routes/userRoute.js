const express   = require('express')
const router    = express.Router();
const userController = require("../controllers/userController")
const {isAuth} = require('../middleware/auth')


//all apis
router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.post('/logOut',isAuth,userController.logOut)
router.get('/profile',isAuth,userController.profile)
router.put('/updateUser',isAuth,userController.userUpdate)
router.delete('/deleteUser',isAuth,userController.deleteUser)


module.exports = router;