const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const authModule = require("../../modules/auth");
const {User,Task} = require('../../database/models/index.js');

const upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname + "-" + Date.now() + ".png");
    },
    
  }),
}).single("profile");

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const data = req.body;
    const response = await authModule.register(data);
    
    const userExist = await User.findOne({where:{email:email}})
    const hashedPassword = await bcrypt.hash(password, 10); 

    if(userExist){
      res.status(401).json({message:"email already exists"})
    }
    else{
      if(response.success == true){

        const user = await User.create({
          name,
          email,
          phone,
          password:hashedPassword,
        });

        return res.status(200).json({message:"user successfully registered",user})
      }else{
        return res
        .status(400)
        .json({...response})
      }
    }
 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async(req,res)=>{
try{  
  const authHeader = req.headers.authorization; 
  if (authHeader) {
      return res.status(402).json({ success: false, message: "Redirecting to home pagee" });
  }
    const data= req.body;
    console.log("data",data);
    
    const response = await authModule.login(data);
    console.log("response",response);
    
    if(response.success==false){
      return res.status(401)
      .json({message : response.message})
    }

    const {email,password}= req.body;
    const user = await User.findOne({where:{email}});
    
    if(!user){
      return res.status(401).json({ message: "User not found" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password!" });
    }else{
      const payload = {id:user.id};
      const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn :"1hr"});

      res.cookie("token",token,{
        httpOnly:true,
      });
      console.log(res.cookie ,"<---cookiesss");
      
      return res.status(200).json({message:"Login successfully",token})
    }
} catch(err){
  return res.status(401).json({message:"Login error occur"})
  }
}

const logout = async (req, res) => {
  try {
    console.log("Redddd",req);
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during logout", error });
  }
};
const update = async(req,res)=>{
 try {
  const data = req.body;
  console.log(data,"gggggggg");

  const existuserAccess = await User.findOne({where:{id:data.id}})
  if(!existuserAccess){return res.status(400).json({message:"Not Authorized to access"})};

  const userExist = await User.findOne({where:{email:data.email}})
  if(userExist){
    return res.status(401).json({message:"email already exists"})
  }

  const userPhoneExist = await User.findOne({where:{phone:data.phone}})
  if(userPhoneExist){
    return res.status(401).json({message:"Phone number already exists"})
  }

  const updateFields = {};
  if (data.name) updateFields.name = data.name;
  if (data.phone) updateFields.phone = data.phone; 
  if (data.password) updateFields.password = data.password;
  if (data.profile) updateFields.profile = data.profile;
  if (data.email) updateFields.email = data.email;


  if (Object.keys(updateFields).length === 0) {
    return res.status(401).json({ message: "No fields to update." });
  }

  await User.update(updateFields, { where: { id:data.id} });
  return res.status(200).json({ message: "User data successfully updated." });
 } catch (error) {
  toast.error(error)
  return res.status(500).json({message:"error ocurres in update"})
 }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const response = await Task.findOne({where:{userid:id}})
    console.log(response , );
    
    if(response){
      return res.status(404).json({ success: false, message: "First Delete all Tasks Before Deleting Account" });
    }

    await User.destroy({ where: { id } });
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




module.exports = {register,upload,login,update,logout,deleteUser}