import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data : loginUser = [] } = useQuery({
    queryKey: ['user'],
    queryFn: async()=>{
        const {data} = await axiosSecure.get(`/users/${user.email}`)
        return data
    }
})
console.log(loginUser)
  const link = (
    <>
      <li className="text-black md:font-bold">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#21d0ec] font-bold rounded-xl"
              : isPending
              ? "pending"
              : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li className="text-black md:font-bold">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#21d0ec] font-bold rounded-xl"
              : isPending
              ? "pending"
              : ""
          }
          to={"/dashboard"}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
              {user && <p className="mx-2 text-[12px]">{user?.displayName}({loginUser?.role})</p>}
            {link}
            
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost text-xl font-extrabold text-[14px] md:text-xl"
        >
          Simple <span className="text-[#21d0ec]">Task</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>

      <div className="navbar-end">
        {user && <div className="mr-2 md:block hidden">
          <p>{user?.displayName}</p>
          <p>{loginUser?.role}</p>
        </div>}

        {user ? (
          <button
            onClick={logOut}
            className="border border-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-[12px] md:text-[16px] hover:bg-[#21d0ec] hover:text-white hover:border-white"
          >
            Logout
          </button>
        ) : (
          <div className="flex md:gap-5 gap-1">
            <Link
              to={"/login"}
              className="border border-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-[12px] md:text-[16px] hover:bg-[#21d0ec] hover:text-white hover:border-white"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="border border-black px-2 py-1 md:px-4 md:py-2 rounded-lg text-[12px] md:text-[16px] hover:bg-[#21d0ec] hover:text-white hover:border-white"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
