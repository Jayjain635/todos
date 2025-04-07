const { Task } = require("../../database/models/index.js");

const addTask = async (req, res) => {

  const titleExist = await Task.findOne({ where: { title: req.body.title } });
  if (titleExist) {
    return res.status(400).json({ message: "Title already exist" });
  }

  try {
    const { title, tag, desc, id } = req.body;
    const task = await Task.create({
      title,
      tag,
      desc,
      userid: id,
    });

    return res.status(200).json({ message: "Successfully added task", task });

  } catch (error) {
    return res.status(400).json({ message: "Erro occured", error: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const data = req.body;
    const access = await Task.findOne({
      where: { title: data.title, userid: data.id },
    });

    if (!data.title) {
      return res.status(400).json({ message: "Enter title" });
    }
    if (!access) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const updateFields = {};
    if (data.tag) updateFields.tag = data.tag;
    if (data.desc) updateFields.desc = data.desc;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    await Task.update(updateFields, { where: { title: data.title } });
    
    return res.status(200).json({ message: "Successfully updated task", data });

  } catch (error) {
    return res.status(400).json({ message: "fail", error: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const data = req.body;
    
    const id = req.params.id;
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

module.exports = { addTask, updateTask, deleteTask };