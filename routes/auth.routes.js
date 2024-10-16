const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middlewares")

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body

  // validaciones
  if (!username || !password) {
    res.status(400).json({ message: "Todos los campos son obligatorios" })
    return
  }

  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if(!regexPass.test(password)) {
    res.status(400).json({message: "la contraseña no es lo suficientemente fuerte"})
    return
  }

  try {
    const foundUser = await User.findOne({ username })
    if (foundUser) {
      res.status(400).json({ message: "Ese nombre ya está en uso" })
      return
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      username,
      password: hashPassword
    })
    res.sendStatus(201)
    
  } catch (error) {
    console.log("error user post",error)
    next(error)
  }

})

router.post("/login", async (req, res, next) => {
  const {username, password} = req.body
  
  if(!username || !password){
    res.status(400).json({message: "Todos los campos son obligatorios"})
    return
  }
  
  try {
    const foundUser = await User.findOne({username})
    if(!foundUser){
      res.status(400).json({message:"usuario no encontrado con ese nombre"})
      return
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    
    if (!isPasswordCorrect){
      res.status(400).json({message:"contraseña incorrecta"})
      return
    }
    
    const payload = {
      _id: foundUser._id,
      username: foundUser.username
    }

    const authToken = jwt.sign(payload,process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "14d"
    })
    res.status(200).json({ authToken:authToken })

  } catch (error) {
    console.log("error en la autenticacion del usuario", error)
    next(error)
  }
})

router.get("/verify", verifyToken, (req, res, next) => {

  console.log(req.payload)

  res.status(200).json(req.payload)
})

module.exports = router;