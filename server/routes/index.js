const Router = require('express')
const router = new Router()

const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')


router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
router.use('/admin', adminRouter)

module.exports = router