const express = require('express')
const { register,login, logout, deleteUser, allUsers, updateUser,editProfile } = require('../controllers/userController')
const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.post("/logout",logout)
route.delete("/delete/:id",deleteUser)
route.get("/users",allUsers)
route.put("/updateuser/:id",updateUser)
route.patch("/edit-profile",editProfile)





module.exports = route