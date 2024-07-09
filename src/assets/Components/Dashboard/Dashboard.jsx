import { Outlet } from "react-router-dom";
import SideNavbar from "../Shared/SideNavbar/SideNavbar";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";



const Dashboard = () => {
    const {user,loading} = useAuth()
    const axiosSecure = useAxiosSecure();
    const [isActive, setActive] = useState(false);
    const closeSidebar = () => {
      setActive(false);
    };
    const { data : loginUser = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/users/${user.email}`)
            return data
        }
    })
    if(loading) return <LoadingSpinner />
    
  return (
      
    
      <div className='relative min-h-screen md:flex'
      >
        {/* <Helmet>
        <title>Dashboard | Home</title>
      </Helmet> */}
      {/* Sidebar */}
      <SideNavbar isActive={isActive} setActive={setActive} loginUser={loginUser} />
      

      {/* Outlet --> Dynamic content */}
      <div onClick={closeSidebar} className='flex-1 md:pl-56'>
          <Outlet />
      </div>
    </div>
      
  )
};

export default Dashboard;