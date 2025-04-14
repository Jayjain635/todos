const express = require("express")
const {  userAuth } = require("../../middleware/index");
const router = express.Router()
const todo = require("../controllers/todo")


router.post("/addTask",userAuth,todo.addTask)
router.post("/allTask",userAuth,todo.allTask)
router.post("/updateTask",userAuth,todo.updateTask)
router.delete("/deleteTask/:id",userAuth,todo.deleteTask)

module.exports = router;