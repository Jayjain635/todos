import React from "react";
import Navbar from "./Navbar";
import TodoTop from "./TodoTop";

function Home() {
  return (
    <div className="h-screen pt-8  text-white">
      <Navbar />

      {/* main section */}
      <div className="flex items-center mt-45 justify-center">
        {/* todo container */}
        <div className="flex flex-col  justify-center items-center">
          <TodoTop/>
        </div>
      </div>

    </div>
  );
}

export default Home;
