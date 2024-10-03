import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";

function Header({ username, setUsername }) {
  const [theme, setTheme] = useState("light");
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="bg-black dark:bg-gradient-to-tr dark:from-red-600 dark:to-red-400 flex justify-between items-center z-20 h-auto">
      <div className="m-2 w-full p-2 flex items-center justify-between gap-20">
        <div>
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-black dark:to-black font-extrabold cursor-pointer text-lg md:text-xl lg:text-4xl"
            onClick={() => navigate("/")}
          >
            Deals
          </h1>
        </div>

        <div className=" flex items-center gap-20">
          {username && (
            <>
              <nav className="hidden lg:flex justify-between items-center gap-20">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "link-custom link-active" : "link-custom"
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "link-custom link-active" : "link-custom"
                  }
                  to="/employees"
                >
                  Employees
                </NavLink>
              </nav>
              <span className="text-white hidden lg:flex items-center text-[12px] md:text-[16px] lg:text-[20px] dark:hover:text-black gap-2 font-bold text-2xl">
                <FaUserCircle className="lg:text-[40px] md:text-[20px] text-[16px]" />
                {username}
              </span>
              <button
                className="text-white hidden lg:flex items-center font-bold text-[12px] md:text-[16px] lg:text-[20px] dark:hover:text-black hover:bg-red-500 p-2 rounded-lg transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                <IoLogOutSharp className="lg:text-[40px] md:text-[20px] text-[16px]" />
                Logout
              </button>
              
            </>
          )}
        </div>
        <button onClick={toggleTheme} className="ml-10 mr-10 group">
                <h1 className="text-black mt-10 p-1 font-medium rounded-md absolute border border-black bg-red-300 z-20 hidden lg:group-hover:flex">
                  {theme === "light" ? "light" : "dark"}
                </h1>
                <MdDarkMode
                  title="Change theme"
                  className="size-6 md:size-10 bg-red-400 dark:bg-black dark:text-red-400 rounded-full transition ease-in-out duration-500"
                />
        </button>
      </div>

      {/* Dropdown*/}
      {username && (
        <div className="lg:hidden z-20">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-3xl font-bold dark:text-black p-2"
          >
            <VscMenu />
          </button>
          {dropdownOpen && (
            <div className="absolute right-2 mt-2 bg-white font-ten dark:bg-black shadow-lg rounded-md">
              <NavLink
                className="block px-4 py-2 text-black dark:text-white hover:bg-red-400 dark:hover:bg-red-600"
                to="/"
                onClick={() => setDropdownOpen(false)} 
              >
                Home
              </NavLink>
              <NavLink
                className="block px-4 py-2 text-black dark:text-white hover:bg-red-400 dark:hover:bg-red-600"
                to="/employees"
                onClick={() => setDropdownOpen(false)} 
              >
                Employee List
              </NavLink>
              <span className="block px-4 py-2 text-black dark:text-white">
                {username}
              </span>
              <button
                className="block px-4 py-2 text-black dark:text-white hover:bg-red-400 dark:hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
