const Router = require('express')
const router = new Router()
const adminController = require("../controllers/adminController");
const authMiddlewares = require("../middleware/authMiddlewares");

router.get(
  "/",
  authMiddlewares.verifyToken,
  authMiddlewares.authorizeAdmin,
  adminController.dashboard
)

module.exports = router