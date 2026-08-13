const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddlewares')

router.post('/sign-up', userController.register)
router.post('/login',userController.login)
router.get('/auth',userController.check)
router.get("/check-cookie",userController.checkCookie);
router.post("/logout", userController.logout);
router.get("/profile", authMiddleware.verifyToken, userController.profile)

module.exports = router