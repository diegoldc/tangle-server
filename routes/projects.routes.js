const verifyToken = require("../middlewares/auth.middlewares");
const Project = require("../models/Project.model")
const router = require("express").Router();

router.post("/", verifyToken, async (req, res, next) => {

  try {
    const response = await Project.create({
      name: req.body.name,
      github: req.body.github,
      deployment: req.body.deployment,
      creationDate: req.body.creationDate,
      description: req.body.description,
      screenshots: req.body.screenshots,
      tech: req.body.tech,
      user: req.body.user,
      collaborators: req.body.collaborators,
      likes: [],
    })
    res.status(201).json(response)
  } catch (error) {
    console.log("error al crear proyecto", error)
    next(error)
  }
})

router.get("/page/:page", async (req, res, next) => {
  const {page} = req.params
  const pageNum = parseInt(page)-1
  try {
    const response = await Project.find({})
    .sort({ creationDate: -1 })
    .limit(10)
    .skip(10 * pageNum)
    .populate([
      { path: "user", select: "username img medals" },
      { path: "collaborators", select: "username img" }
    ])
    // console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar todos los proyectos", error)
    next(error)
  }
})

router.post("/my-network/:page", verifyToken, async (req,res,next) => {
  const {page} = req.params
  const pageNum = parseInt(page)-1
  try {
    const {userArray} = req.body
    const response = await Project.find({'user': {$in:userArray}})
    .sort({ creationDate: -1 })
    .limit(10)
    .skip(10 * pageNum)
    .populate("user","username img medals")
    .populate("collaborators","username img medals")
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar los proyectos de tus seguidores",error)
    next(error)
  }
})

router.get("/:projectId", async (req, res, next) => {
  try {
    const response = await Project.findById(req.params.projectId)
      .populate("user","username img medals")
      .populate("collaborators","username img medals")
    res.status(200).json(response)
  } catch (error) {
    console.log("error al traer un solo usuario por ID", error)
    next(error)
  }
})

router.get("/tech/:tech", async (req,res,next) => {
  console.log(req.params.tech)
  try {
    const response = await Project.find({ tech:{$regex: req.params.tech, $options: "i"}})
    .populate([
      { path: "user", select: "username img medals" },
      { path: "collaborators", select: "username img" }
    ])
    .sort({ creationDate: -1 })
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar proyectos por technologia",error)
    next(error)
  }
})

router.get("/user/:userId", async (req, res, next) => {
  try {
    const response = await Project.find({ user: req.params.userId })
      .populate([
        { path: "user", select: "username img medals" },
        { path: "collaborators", select: "username img" }
      ])
    res.status(200).json(response)
  } catch (error) {
    console.log("error al traer proyectos de un usuario", error)
    next(error)
  }
})

router.put("/:projectId", verifyToken, async (req, res, next) => {
  try {
    const response = await Project.findByIdAndUpdate(req.params.projectId, {
      name: req.body.name,
      github: req.body.github,
      deployment: req.body.deployment,
      creationDate: req.body.creationDate,
      description: req.body.description,
      screenshots: req.body.screenshots,
      tech: req.body.tech,
      user: req.body.user,
      collaborators: req.body.collaborators,
      likes: req.body.likes,
    }, { new: true })

    res.status(202).json(response)
  } catch (error) {
    console.log("error al actualizar proyecto", error)
    next(error)
  }
})

router.patch("/collabs/:projectId", verifyToken, async (req, res, next) => {

  const { userId } = req.body

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      { $addToSet: { collaborators: userId } },
      { new: true }
    );


    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);


  } catch (error) {
    console.log("error al actualizar colaboradores", error)
    next(error)
  }
})

router.patch("/likes/:projectId", verifyToken, async (req, res, next) => {
  const { userId } = req.body
  try {
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      { $addToSet: { likes: userId } }, // addToSet verifica antes de añadir al array si ya existe uno igual
      { new: true }
    );


    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);


  } catch (error) {
    console.log("error al actualizar likes", error)
    next(error)
  }
})

router.patch("/un-likes/:projectId", verifyToken, async (req,res,next) => {
  const { likes } = req.body
  try {
    const response = await Project.findByIdAndUpdate(req.params.projectId,{likes:likes},{new:true})
    res.status(200).json({response})
  } catch (error) {
    console.log("error al eliminar un like",error)
    next(error)
  }
})

router.delete("/:projectId", verifyToken, async (req,res,next) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId)
    res.sendStatus(202)
  } catch (error) {
    console.log("error al eliminar proyecto", error)
    next(error)
  }
})

module.exports = router;