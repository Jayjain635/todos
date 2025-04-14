import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from '../api/api';
import getUserDetails from '../util/GetUser';
import { jwtDecode } from "jwt-decode";
function Navbar() {
  const navigater = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const[deleteAcc,setDeleteAcc]=useState(false)
  const handleLogout = async () => {
    try {
      const response = await api.authServices.logoutUser(); 
      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("todoAppUser");     

        navigater( "/login"); 
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error.message);
    }
  };
  const handleDeleteUser = async () => {
   const token = getUserDetails().token;
        const userId =jwtDecode(token).id
    if (!userId) {
      console.error("User ID is missing. Cannot delete account.");
      return;
    }
  
    try {
      const response = await api.authServices.deleteUser(userId);
      console.log(response,"resdtedwbajusbjus");
      
      
      if (response.status === 200) {
        console.log("User deleted successfully");
        localStorage.removeItem("todoAppUser");
        navigater("/register");
      } else {
        console.error("Failed to delete user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  
  return (
    <div className="h-25 bg-blue-800 px-10 text-white flex justify-between items-center fixed top-0 w-full">
      <h1 className="font-bold text-4xl ">My Todo's</h1>

      {/* dropDownMenu */}
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer"
      >
        {isMenuOpen ? <IoClose size={40} /> : <FaBars size={30} />}
      </div>
      {isMenuOpen && (
        <div className="absolute top-20 right-10 bg-white text-black w-56 rounded-lg shadow-lg flex flex-col gap-2 p-4">
          <button
            onClick={() => {
              navigater("/Update");
            }}
            className="hover:bg-blue-200 px-4 py-2 text-left"
          >
            {" "}
            Update Profile
          </button>
          <button onClick={handleLogout} className="hover:bg-orange-200 px-4 py-2 text-left"> Log out</button>
          <button onClick={()=>{setDeleteAcc(true),setIsMenuOpen(false)}} className="hover:bg-red-200 px-4 py-2 text-left">
            Delete Account  !!
          </button>
        </div>
      )}
          {deleteAcc && (<div className="bg-black flex flex-col justify-center border rounded-2xl  p-7 h-60 absolute -translate-x-1/2 -translate-y-1/2 top-120 left-1/2 transform ">
          <h2>Are you sure you want to delete account ?</h2>
          <div className="flex w-full justify-between mt-5">
            <button onClick={handleDeleteUser} className="hover:bg-red-300 rounded-md bg-red-500 px-4 py-2 text-left">Confirm</button>
            <button onClick={()=>{setDeleteAcc(false)}} className="hover:bg-green-300  rounded-md bg-green-500 px-4 py-2 text-left">Cancel</button>
          </div>
        </div>)}
    </div>
  );
}

export default Navbar;
