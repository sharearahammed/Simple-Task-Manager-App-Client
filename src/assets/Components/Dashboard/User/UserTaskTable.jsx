import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

/* eslint-disable react/prop-types */
const UserTaskTable = ({usertask,idx}) => {
    const asiosSecure = useAxiosSecure();

    const handleProcess = async()=>{
        const res = await asiosSecure.put(`/tasks/${usertask._id}`,{ status: "In Progress" });
          console.log(res.data);
          toast.success("Task Delete successfully");
    }
    const handleComplete = async()=>{
        const res = await asiosSecure.put(`/tasks/${usertask._id}`,{ status: "Completed" });
          console.log(res.data);
          toast.success("Task Delete successfully");
    }

    console.log(usertask)
    return (
        <tr>
        <th>
          <label>
            {idx+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{usertask?.task_title}</div>
            </div>
          </div>
        </td>
        <td>
        {usertask?.description}
        </td>
        <td>{usertask?.taskCreator.name}</td>
        <td>{usertask?.date}</td>
        <td>{usertask?.status}</td>

            {
                usertask?.status ==="To-Do" && <>
                <td>
            <button onClick={handleProcess} className="border px-4 py-2 rounded-lg bg-[#21d0ec] text-white">In Progress</button>
        </td>
                </>
            }
        
            {
                usertask?.status === "Completed" ? "" : <td>
                <button onClick={handleComplete} className="border px-4 py-2 rounded-lg bg-[#21d0ec] text-white">Completed</button>
            </td>
                
            }

      </tr>
    );
};

export default UserTaskTable;

