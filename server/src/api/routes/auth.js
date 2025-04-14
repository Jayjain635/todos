const express = require("express")
const {  userAuth } = require("../../middleware/index");
const router = express.Router()
const auth = require("../controllers/auth")

router.post("/register",auth.upload,auth.register );
router.post("/login",auth.login )

router.use(userAuth);
router.post("/update",auth.update)
router.post("/logout",auth.logout )
router.delete('/delete/:id', auth.deleteUser); 
module.exports=router;