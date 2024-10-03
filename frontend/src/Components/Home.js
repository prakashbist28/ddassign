import React from "react";
import { CiBoxList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import homebg from "../assets/homebg.jpg"

function Home({ username }) {
  return (
    <div>
      
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover -z-10 bg-center opacity-5"
        style={{ backgroundImage: `url(${homebg})` }}
      ></div>

      
      <div className="flex flex-col items-center justify-center mt-20">
      
        <h1 className="uppercase text-transparent bg-clip-text bg-gradient-to-b  from-red-600 to-orange-300 md:text-8xl pb-10  text-4xl font-bold font-ten">
          WELCOME !{" "}
        </h1>
        <h1 className="uppercase text-transparent bg-clip-text bg-gradient-to-b  from-red-600 to-orange-300 md:text-8xl pb-10  text-3xl font-normal font-ten">
          {username}{" "}
        </h1>
        <img src={homebg} className="w-96" />
        {/* <h1 className="text-gray-500">img by freepik</h1> */}
      </div>

      <div className="mt-10">
        <div className="flex flex-col min-h-40 md:flex-row flex-grow gap-8 items-center justify-center mt-8">
         
          <Link
            to="/create-employee"
            className="border-2 border-r-8 border-b-8  w-80 cursor-pointer relative flex border-black 
          dark:border-red-400 dark:hover:border-red-400  p-4  group before:absolute dark:before:bg-red-400 dark:before:z-10 
        before:bg-gradient-to-t from-red-600 to-red-300 before:h-full before:w-full before:top-0 before:left-0 before:origin-top before:transition before:ease-in-out before:duration-300 before:-z-10 before:scale-y-0 hover:before:scale-y-100"
          >
            <div className="flex gap-4 z-20">
              <div className=" dark:text-red-400 dark:group-hover:text-black">
                <IoCreateOutline className="size-20" />
              </div>
              <div className="flex flex-col pt-2">
                <h1 className="text-left text-[16px] font-fourth font-semibold  dark:text-red-400 dark:group-hover:text-black">
                  Create a new
                </h1>
                <h1 className="text-[32px] font-fourth font-bold  dark:text-red-400 dark:group-hover:text-black">
                  Employee
                </h1>
              </div>
            </div>
          </Link>

          <Link
            to="/employees"
            className="border-2 border-r-8 border-b-8  w-80 cursor-pointer relative flex border-black 
          dark:border-red-400 dark:hover:border-red-400  p-4  group before:absolute dark:before:bg-red-400 dark:before:z-10 
        before:bg-gradient-to-t from-red-600 to-red-300 before:h-full before:w-full before:top-0 before:left-0 before:origin-top 
        before:transition before:ease-in-out before:duration-300 before:-z-10 before:scale-y-0 hover:before:scale-y-100"
          >
            <div className="flex gap-4 z-20">
              <div className=" dark:text-red-400 dark:group-hover:text-black">
                <CiBoxList className="size-20" />
              </div>
              <div className="flex flex-col pt-2">
                <h1 className="text-left text-[16px] font-fourth font-semibold  dark:text-red-400 dark:group-hover:text-black">
                  Checkout all the
                </h1>
                <h1 className="text-[32px] font-fourth font-bold  dark:text-red-400 dark:group-hover:text-black">
                  Employees
                </h1>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;
