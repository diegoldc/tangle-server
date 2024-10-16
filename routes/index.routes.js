const router = require("express").Router();
const authRouter = require("./auth.routes.js")



router.use("/auth", authRouter)

module.exports = router;
