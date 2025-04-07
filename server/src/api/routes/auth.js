const express = require("express")
const {  userAuth } = require("../../middleware/index");
const router = express.Router()
const auth = require("../controllers/auth")
const todo = require("../controllers/todo")

router.post("/register",auth.upload,auth.register );
router.post("/login",auth.login )

router.use(userAuth);
router.post("/update",auth.update)

router.post("/addTask",todo.addTask)
router.post("/updateTask",todo.updateTask)
router.delete("/deleteTask/:id",todo.deleteTask)

module.exports=router;