import React ,{useEffect} from "react";
import Navbar from "./Navbar";
import TodoTop from "./TodoTop";

function Home() {
  useEffect(() => {
    history.pushState(null, null, location.href);
    const preventBackNavigation = () => {
      history.pushState(null, null, location.href);
    };
    window.addEventListener("popstate", preventBackNavigation);
    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);
  return (
    <div className="h-screen pt-8  text-white bg-black">
      <Navbar />

      {/* main section */}
      <div className="flex items-center mt-17 justify-center">
        {/* todo container */}
        <div className="flex flex-col  justify-center items-center">
          <TodoTop/>
        </div>
      </div>

    </div>
  );
}

export default Home;
