const express = require("express")
const router = express.Router()

const { getAllUsers, getUser, addUser, updateUser, deleteUser } = require("../controllers/userControllers")

router.get("/users", getAllUsers)
router.get("/user", getUser)
router.post("/create", addUser)
router.put("/update", updateUser)
router.delete("/delete", deleteUser)


module.exports = router