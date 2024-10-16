const router = require("express").Router();
const authRouter = require("./auth.routes.js")
const projectRouter = require("./projects.routes.js")
const commentRouter = require("./comments.routes.js")
const userRouter = require("./users.routes.js")

router.use("/auth", authRouter)

router.use("/projects", projectRouter)

router.use("/comments", commentRouter)

router.use("/users", userRouter)

module.exports = router;
