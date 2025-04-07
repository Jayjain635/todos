const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const authModule = require("../../modules/auth");
const {User} = require('../../database/models/index.js');

const upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "uploads");
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
      res.status(400).json({message:"email already exists"})
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
    const data= req.body;
    console.log(data);
    
    const response = await authModule.login(data);
    if(response.success==false){
      return res
      .status(400)
      .json({...response})
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

      return res.status(200).json({message:"Login successfully",token})
    }
} catch(err){
  return res.status(400).json({message:"Login error occur"})
  }
}

const update = async(req,res)=>{
  const data = req.body;
  if(!data.email){
    return res.status(400).json({message:"Enter email"})
  }
  console.log(data);
  
  const existuserEmail = await User.findOne({where:{email:data.email}})
  if(!existuserEmail){return res.status(400).json({message:"Email is invalid"})};
  
  const existuserAccess = await User.findOne({where:{email:data.email , id:data.id}})
  if(!existuserAccess){return res.status(400).json({message:"Not Authorized to access"})};

  
  const updateFields = {};
  if (data.name) updateFields.name = data.name;
  if (data.phone) updateFields.phone = data.phone; 
  if (data.password) updateFields.password = data.password;
  if (data.profile) updateFields.profile = data.profile;


  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "No fields to update." });
  }

  await User.update(updateFields, { where: { email: data.email } });
  return res.status(200).json({ message: "User data successfully updated." });
}

module.exports = {register,upload,login,update}