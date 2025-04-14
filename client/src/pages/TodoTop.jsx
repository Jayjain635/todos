import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit} from "react-icons/fa";
import '../app.css'
import getErrorMessage from '../util/GetError';
import getUserDetails from '../util/GetUser';
import { jwtDecode } from "jwt-decode";
import api from '../api/api';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function TodoTop() {  
  const navigater = useNavigate();
  const[allTodo,setAllTodo] = useState([])
  const[newTitle,setNewTitle] = useState([])
  const[newDesc,setNewDesc] = useState([])
  const[editingIndex, setEditingIndex] = useState(null);
  const token = getUserDetails().token;
  const userId =jwtDecode(token).id
  // const navigate = useNavigate();
  // const location = useLocation();

  
  // const refreshPage = () => {
  //   navigate(location.pathname, { replace: true });
  // };


  const getAllToDo = async ()=>{
    try {
      const response = await api.todoServices.allTask(userId)
      if(response.status == 200){
        setAllTodo(response.data.tasks)
      }
    } catch (error) {
      console.log(getErrorMessage("useEfeectERRRRO",error));
    }
  }

  useEffect(()=>{
    const user = getUserDetails();
    if(user && userId){
      getAllToDo();
    }
    else{
      navigater('/')
    }
  },[])

  async function handleAddTodo(e) {
    try {
      e.preventDefault();
      if (!String(newTitle).trim()) {
        toast.error("Title cannot be empty!");
        return;
      }
      if (editingIndex !== null) {
        const taskId = allTodo[editingIndex].id;
        const updatedTodo = { id:taskId,title: newTitle, desc: newDesc, userId: userId };
        const response = await api.todoServices.updateTask(updatedTodo); 
  
        if (response.status === 200) {
          const updatedTodos = [...allTodo];
          updatedTodos[editingIndex] = { title: newTitle, desc: newDesc };
          setAllTodo(updatedTodos);
          setEditingIndex(null);
        }else{
          toast.error("notoooooooooooooooooo")
        }
      } else {
        const newTodoItem = { title: newTitle, desc: newDesc, userId: userId };
        const response = await api.todoServices.addTask(newTodoItem); 
        console.log("Add Response:", response);
        if (response.status === 200) {
          setAllTodo((prevTodos) => [...prevTodos, newTodoItem]);
        }
      }
      getAllToDo();
      setNewTitle('');
      setNewDesc('');
      // window.location.reload();
      
    } catch (error) {
      const errorMessage = getErrorMessage(error); 
      toast.error(errorMessage);
      console.log("Error:", errorMessage);
    }
  }
  function handleClearTodo(e){
    e.preventDefault();
    setNewDesc("");
    setNewTitle("");
  }
  async function handleDeleteTodo(idx){
    try {
    const taskId =  allTodo[idx].id;
    const res =await api.todoServices.deleteTask(taskId);
    
    if (res.status === 200) {
      getAllToDo();
      setAllTodo((prevTodos) => prevTodos.filter((_, index) => index !== idx));     

      toast.success("Task deleted successfully");
    } else {
      toast.error("Failed to delete task");
    }
    } catch (error) {
      const errorMessage = getErrorMessage(error); 
      toast.error(errorMessage);
      console.log("Error:", errorMessage);
    }
  }
  function handleEditTodo(idx) {
    setEditingIndex(idx);
    setNewTitle(allTodo[idx].title);
    setNewDesc(allTodo[idx].desc);
  }

  return ( 
   <>
   {/* TodoTop */} 
    <div className=" top-25 bg-orange-400 w-280 px-5 py-5 ">
            <form className="flex justify-between items-center ">
              <div className="">
                <label htmlFor="title" className=" font-bold text-xl ">
                  Title
                </label>
                <input
                  value={newTitle}
                  onChange={(e)=>{setNewTitle(e.target.value)}}
                  type="text"
                  name="title"
                  placeholder="Todo Title"
                  className="w-full p-2  border focus:outline-0 focus:border-blue-500"
                />
              </div>
              <div className="">
                <label
                  htmlFor="description"
                  className=" font-bold text-xl"
                >
                  Description
                </label>
                <input
                  value={newDesc}
                  onChange={(e)=>{setNewDesc(e.target.value)}}
                  type="text"
                  name="description"
                  placeholder="Todo Description"
                  className="w-full p-2 border focus:outline-0 focus:border-blue-500"
                />
              </div>
              <div className=" mt-7 w-42 justify-between flex ">
              {editingIndex === null ? (
                  <>
                    <button className="w-20 bg-blue-700 text-white p-2" onClick={handleAddTodo}>Add</button>
                    <button className="w-20 bg-green-700 text-white p-2" onClick={handleClearTodo}>Clear</button>
                  </>
              ) : (
                <button className="w-20 bg-orange-500 text-white p-2" onClick={handleAddTodo}>Update</button>
              )}
              </div>
            </form>
    </div>

    {/* TodoList */}
    <div className="bg-orange-400 min-w-280 px-25 min-h-160 pb-4">
          <h2 className="font-bold text-4xl mt-5  text-center">TodoList</h2>
          <div className="todo-list mt-9 flex flex-col items-center gap-4 h-150 overflow-y-auto "> 

            {allTodo.map((item,index)=>{
              return(
                <div key={index} className="todo-list-item flex items-center px-2 min-h-20 w-220 bg-blue-700 justify-between ">
              <div className=" w-150">
                <h3 className="text-2xl ">{item.title}</h3>
                <p className="overflow-hidden inline text-md">{item.desc}</p>
              </div>
              <div className="flex items-center w-20 justify-between ">
                <FaEdit  size={30} onClick={() =>{handleEditTodo(index)}}/>
                <FaTrash size={30} onClick={()=>{handleDeleteTodo(index)}}/>
              </div>
            </div>
              )
            })}
         
           
          </div>
        </div>
   </>
  )

}

export default TodoTop
