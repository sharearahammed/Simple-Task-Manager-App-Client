import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddTasks from "./AddTasks";

const TaskAdd = () => {
    const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [startDate, setStartDate] = useState(new Date());
  const [selectedUsers, setSelectedUsers] = useState([]);


  const { mutateAsync } = useMutation({
    mutationFn: async taskdata => {
      const { data } = await axiosSecure.post(`/addTask`, taskdata)
      return data
    },
    onSuccess: () => {
      console.log('Data Saved Successfully')
      toast.success('Task Added Successfully!')
      navigate('/dashboard/adminTaskList')
      setLoading(false)
    },
  })

  const { data : allusers = [],refetch } = useQuery({
    queryKey: ['userss'],
    queryFn: async()=>{
        const {data} = await axiosSecure.get(`/users`)
        return data
    }
})

  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const task_title = form.task_title.value
    const description = form.description.value
    const date = startDate
    const currentTime  = new Date()
    // const assignUser = form.assignUser.value

    

    const taskCreator = {
      name: user?.displayName,
      email: user?.email,
    }

    try {
      const taskdata = {
        task_title,
        description,
        date,
        currentTime,
        assignUser: selectedUsers,
        status:"To-Do",
        taskCreator
      }
      console.table(taskdata)

      //   Post request to server
      await mutateAsync(taskdata)
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  

    return (
        <div className="pt-[90px] pb-6 p-5 lg:pl-14 min-h-screen rounded-none bg-no-repeat bg-cover overflow-x-auto w-full flex flex-col justify-center items-center text-gray-800 bg-gray-50">
        <AddTasks
        setStartDate={setStartDate}
        startDate={startDate}
        handleSubmit={handleSubmit}
        loading={loading}
        allusers={allusers}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
         />
        </div>
    );
};

export default TaskAdd;