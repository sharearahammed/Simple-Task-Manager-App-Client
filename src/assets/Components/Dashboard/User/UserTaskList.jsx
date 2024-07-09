import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import UserTaskTable from "./UserTaskTable";

const UserTaskList = () => {
    const [userTasks, setUserTasks] = useState([]);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosSecure.get(`/task`);
        setUserTasks(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user.email) {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);



  return (
    <div className="pt-[90px] pb-6 lg:pl-14 min-h-screen rounded-none bg-no-repeat bg-cover overflow-x-auto w-full"
  >
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Task Title</th>
            <th>Description</th>
            <th>Creator Email</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {userTasks?.filter(task => task.assignUser.includes(user?.email)).map((usertask, idx) => (
  <UserTaskTable
    key={usertask._id} 
    usertask={usertask}
    idx={idx}
  />
))}
        </tbody>
      </table>
      
    </div>
  );
};

export default UserTaskList;
