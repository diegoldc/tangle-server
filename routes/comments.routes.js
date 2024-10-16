const Comment = require("../models/Comment.model")
const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middlewares")


router.get("/", async (req, res, next) => {
  try {
    const response = await Comment.find({})
      .populate("user", "username img medals")
      .populate("project","name creationDate")
      // .sort({ creationDate: -1 })
    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar todos los comentarios", error)
    next(error)
  }
})

router.post("/", verifyToken, async (req, res, next) => {

  try {
    const response = await Comment.create({
      content: req.body.content,
      project: req.body.project,
      user: req.body.user
    })
    res.status(201).json(response)
  } catch (error) {
    console.log("error al crear usuario", error)
    next(error)
  }
})

router.get("/:projectId", async (req, res, next) => {
  try {
    const response = await Comment.find({project:req.params.projectId})
      .populate("user", "username img medals")
      // .sort({ creationDate: -1 })
    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar todos los comentarios de un proyecto", error)
    next(error)
  }
})

router.put("/:commentId", verifyToken, async (req,res,next) => {
  if(!req.body.content){
    res.status(400).json({message:"Comment must have content"})
    return
  }
  try {
    const response = await Comment.findByIdAndUpdate(req.params.commentId,{
      project:req.body.project,
      user:req.body.user,
      content:req.body.content
    },{new:true})
    res.status(202).json(response)
  } catch (error) {
    console.log("error al editar un comentario",error)
    next(error)
  }
})

router.delete("/:commentId", verifyToken, async (req,res,next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId)
    res.sendStatus(202)
  } catch (error) {
    console.log("error al eliminar un comentario",error)
    next(error)
  }
})

module.exports = router;