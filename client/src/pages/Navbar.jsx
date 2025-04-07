import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigater = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-25 bg-blue-500 px-10 text-white flex justify-between items-center fixed top-0 w-full">
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
          <button
            onClick={() => {
              navigater("/ResetPassword");
            }}
            className="hover:bg-orange-200 px-4 py-2 text-left"
          >
            Reset Password
          </button>
          <button onClick={() => {
              navigater("/Register");
            }} className="hover:bg-red-200 px-4 py-2 text-left">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
