import React, { useState } from 'react'
import { FaTrash, FaEdit} from "react-icons/fa";
import '../app.css'
function TodoTop() {  
  const[allTodo,setAllTodo] = useState([])
  const[newTitle,setNewTitle] = useState([])
  const[newDesc,setNewDesc] = useState([])
  const[editingIndex, setEditingIndex] = useState(null);

  function handleAddTodo(e) {
    e.preventDefault();
    if (!String(newTitle).trim()) {
      alert("Title cannot be empty!");
      return;
    }
    if(editingIndex!==null){
      let updatedTodos=[...allTodo];
      updatedTodos[editingIndex]={title:newTitle,desc:newDesc}
      setAllTodo(updatedTodos)
      setEditingIndex(null)
    }else{
      let newTodoItem = { title: newTitle, desc: newDesc };
      setAllTodo((prevTodos) => [...prevTodos, newTodoItem]);
    }
  
    // Clear input fields
    setNewTitle('');
    setNewDesc('');
  }
  function handleClearTodo(e){
    e.preventDefault();
    setNewDesc("");
    setNewTitle("");
  }

  function handleDeleteTodo(idx){
    console.log(idx);
    
    let reducedTodo = [...allTodo]
    reducedTodo.splice(idx,1)
    setAllTodo(reducedTodo);
  }
  function handleEditTodo(idx) {
    setEditingIndex(idx);
    setNewTitle(allTodo[idx].title);
    setNewDesc(allTodo[idx].desc);
  }

  return ( 
   <>
   {/* TodoTop */} 
    <div className="fixed top-25 bg-orange-400 w-280 px-5 py-5 ">
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
                    <button className="w-20 bg-blue-500 text-white p-2" onClick={handleAddTodo}>Add</button>
                    <button className="w-20 bg-green-500 text-white p-2" onClick={handleClearTodo}>Clear</button>
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


          <div className="todo-list mt-9 flex flex-col items-center gap-4 h-150 overflow-y-auto scrollbar-hide"> 

            {allTodo.map((item,index)=>{

              return(
                <div key={index} className="todo-list-item flex items-center px-2 min-h-20 w-220 bg-blue-500 justify-between ">
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
