const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
console.log(req.headers)
  try {
    const tokenArr = req.headers.authorization.split(" ")
    const token = tokenArr[1]
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    req.payload = payload
    next()
  } catch (error) {
    res.status(401).json({message: "Token no valido o no existe"})
    console.log(error)
  }
}

module.exports = verifyToken