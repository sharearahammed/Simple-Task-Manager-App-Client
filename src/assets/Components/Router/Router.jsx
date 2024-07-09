import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Signup from "../Signup/Signup";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Dashboard/DashboardHome";
import TaskAdd from "../Dashboard/Admin/TaskAdd";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import AdminTaskList from "../Dashboard/Admin/AdminTaskList";
import UserTaskList from "../Dashboard/User/UserTaskList";
import UserProfile from "../Dashboard/User/UserProfile/UserProfile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement:<ErrorPage />,
      children:[
        {
            path:"/",
            element:<Home />
        },
        {
            path:"/signup",
            element:<Signup />
        },
        {
            path:"/login",
            element:<Login />
        }
      ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children:[
            {
                index: true,
                element:<PrivateRoute><DashboardHome /></PrivateRoute>
            },
            {
                path:"addNewTask",
                element:<PrivateRoute><TaskAdd/></PrivateRoute>
            },
            {
                path:"manageUsers",
                element:<PrivateRoute><ManageUsers/></PrivateRoute>
            },
            {
                path:"adminTaskList",
                element:<PrivateRoute><AdminTaskList/></PrivateRoute>
            },
            {
                path:"userTaskList",
                element:<PrivateRoute><UserTaskList /></PrivateRoute>
            },
            {
                path:"userProfile",
                element:<PrivateRoute><UserProfile /></PrivateRoute>
            }
        ]
    }
  ]);

  export default router;