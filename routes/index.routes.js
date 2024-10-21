const router = require("express").Router();
const authRouter = require("./auth.routes.js")
const projectRouter = require("./projects.routes.js")
const commentRouter = require("./comments.routes.js")
const userRouter = require("./users.routes.js");
const verifyToken = require("../middlewares/auth.middlewares.js");
const cloudinary = require("../cloudinary/cloudinary")

router.use("/auth", authRouter)

router.use("/projects", projectRouter)

router.use("/comments", commentRouter)

router.use("/users", userRouter)

router.post("/upload-img", verifyToken, async (req, res, next) => {
  try {
    const { image } = req.body
    const uploadedImage = await cloudinary.uploader
      .upload(
        image, {
        upload_preset: "User_Avatar",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"]
      })

    res.status(200).json(uploadedImage)
  } catch (error) {
    next(error)
  }

})

module.exports = router;
