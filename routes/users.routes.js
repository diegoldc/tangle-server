const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middlewares")

router.get("/:userId", async (req,res,next) => {
  try {
    const response = await User.findById(req.params.userId)
    res.status(200).json(response)
  } catch (error) {
    console.log("error al buscar un usuario", error)
    next(error)
  }
})

router.get("/", async (req,res,next) => {
  try {
    const response = await User.find({},"username img")
    res.status(200).json(response)
  } catch (error) {
    console.log("error al traer todos los usuarios",error)
    next(error)
  }
})

router.patch("/follow/:userId", verifyToken, async (req,res,next) => {
  //! el cliente debe enviar el usuario que quiere seguir a otro por params y el usuario a seguir por body con la propiedad "followedUserId"
  const {followedUserId} = req.body

  try {
    await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { following: followedUserId } }, // addToSet verifica antes de añadir al array si ya existe uno igual
      { new: true }
    )
    res.sendStatus(202)
  } catch (error) {
    console.log("error al seguir a un usuario",error)
    next(error)
  }
})

router.patch("/:userId/profile", verifyToken, async(req,res,next) => {
  const {username, firstName, lastName, img, linkedin, github, tech} = req.body
  try {
    await User.findByIdAndUpdate(req.params.userId,{
      username,
      firstName,
      lastName,
      img,
      linkedin,
      github,
      tech
    })
    res.sendStatus(202)
  } catch (error) {
    console.log("error al actualizar el usuario", error)
    next(error)
  }

})

router.patch("/:userId/password",verifyToken, async(req, res, next) => {

  const {password} = req.body

  if(!password){
    res.status(400).json({message:"Please introduce your new password"})
    return
  }

  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if(!regexPass.test(password)) {
    res.status(400).json({message: "password does not fulfil the requirements"})
    return
  }
  
  try {
    
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.findByIdAndUpdate(req.params.userId,{
      password:hashPassword
    })
    res.status(202).json({message:"updated password"})
  } catch (error) {
    console.log("error al actualizar contraseña",error)
    next(error)
  }
})

module.exports = router;