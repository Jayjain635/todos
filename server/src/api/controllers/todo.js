const { Task } = require("../../database/models/index.js");

const addTask = async (req, res) => {

  
  try {
    const { title, desc, id } = req.body;
    const titleExist = await Task.findOne({ where: { title: req.body.title ,userid:id} });

    if (titleExist) {
      return res.status(400).json({ message: "Title already exist" });
    }
    if(!id){
      return res.status(400).json({ message: "Add authorization token first....", error: error });
    }
    
    const task = await Task.create({
      title,
      desc,
      userid: id,
    });

    return res.status(200).json({ message: "Successfully added task", task });

  } catch (error) {
    return res.status(400).json({ message: "Error occured", error: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const data = req.body;
    const access = await Task.findOne({where: { userid: data.userId }});

    if (!data.title) {
      return res.status(400).json({ message: "Enter title" });
    }
    if (!access) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    const updateFields = {};
    if (data.desc) updateFields.desc = data.desc;
    if (data.title) updateFields.title = data.title;
    
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    await Task.update(updateFields, { where: { userid: data.userId,id:data.id } });
    return res.status(200).json({ message: "Successfully updated task", data });

  } catch (error) {
    return res.status(400).json({ message: "fail", error: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const data = req.body;
    console.log("data",data);
    
    const id = req.params.id;
    console.log("id",id);
    
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const access = await Task.findOne({ where: { id: id, userid: data.id } });
    if (!access) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const task = await Task.findOne({ where: { id: id } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.destroy({ where: { id } });
    return res.status(200).json({ message: "Successfully Deleted task", task });

  } catch (error) {
    return res.status(400).json({ message: "Error occur", error: error });
  }
};

const allTask = async (req, res) => {
  try {
    const userid = req.body.id
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const tasks = await Task.findAll({ where: { userid: userid } });
    if (tasks.length === 0) {
      return res.status(201).json({ message: "No tasks found for this user" });
    }

    return res.status(200).json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error occurred while retrieving tasks", error });
  }
};
module.exports = { addTask, updateTask, deleteTask,allTask };