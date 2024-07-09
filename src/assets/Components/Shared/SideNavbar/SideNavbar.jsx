/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const SideNavbar = ({ isActive,setActive, loginUser }) => {
    const {logOut}=useAuth();
    return (
        <div>
      {/* Small Screen Navbar */}
      <div className="pt-5 fixed z-10 text-gray-800 flex justify-end w-full">
        
        <div className="flex justify-center items-center lg:mr-10">
          <div>
            {loginUser && (
              <div className="">
                <div className="text-[10px] lg:text-[20px] flex pt-2 items-center gap-5">
                  <h1 className="">{loginUser.role}</h1> |
                  <h1 className="">{loginUser.name}</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setActive(!isActive)}
          className="lg:hidden mobile-menu-button p-2 lg:p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#D7FFDD] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          !isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-700 ease-in-out
        bg-gray-100`}
      >
        <div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            <div>
            <div className=" w-full md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
            <Link to={"/"} className="">
            <div className=" flex justify-center items-center gap-2 lg:text-2xl font-extrabold">
              <h1>Simple <span className="text-[#21d0ec]">Task</span></h1>
            </div>
            </Link>
          </div>
            </div>
            <nav>
              {loginUser.role === "User" ? (
                <>
                  <NavLink
                    to="userTaskList"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaThList className="w-5 h-5" /> */}
                    <img className="w-8 h-8" src="https://i.ibb.co/zNsxP98/pngtree-task-list-line-icon-png-image-9133765.png" alt="" />

                    <span className="mx-4 font-medium">TaskList</span>
                  </NavLink>
                  <NavLink
                    to="userProfile"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaClipboardList className="w-5 h-5" /> */}
                    <CgProfile className="w-7 h-7" />

                    <span className="mx-4 font-medium">User Profile</span>
                  </NavLink>
                  
                </>
              ) : (
                ""
              )}
              {loginUser.role === "Admin" ? (
                <>
                  <NavLink
                    to="addNewTask"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <MdOutlinePostAdd className="w-5 h-5" /> */}
                    <img className="w-7 h-7" src="https://i.ibb.co/DbLk0Tj/clipboard-task-add-regular-icon-202968.png" alt="" />

                    <span className="mx-4 font-medium">Add newTasks</span>
                  </NavLink>
                  <NavLink
                    to="manageUsers"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <MdOutlinePostAdd className="w-5 h-5" /> */}
                    <FaUsers className="w-6 h-6" />

                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>
                  <NavLink
                    to="adminTaskList"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaClipboardList className="w-5 h-5" /> */}
                    <img className="w-9 h-7" src="https://i.ibb.co/sHhhwSr/png-clipart-computer-icons-task-management-action-item-compliance-icon-angle-text-removebg-preview.png" alt="" />

                    <span className="mx-4 font-medium">MyTask’s</span>
                  </NavLink>
                  
                </>
              ) : (
                ""
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <Link to={"/login"}>
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-5 text-black hover:bg-gray-200 rounded-lg   hover:text-gray-700 transition-colors duration-300 transform"
            >
              {/* <GrLogout className="w-5 h-5" /> */}
              <img className="w-7 h-7" src="https://i.ibb.co/w6RTKgQ/logout-removebg-preview.png" alt="" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
};

export default SideNavbar;