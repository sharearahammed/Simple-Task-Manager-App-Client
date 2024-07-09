/* eslint-disable react/prop-types */

import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUsersTable = ({user,refetch}) => {
    const axiosSecure = useAxiosSecure();
    const [selectedRole, setSelectedRole] = useState(user?.role);

    

    const handleDeleteUser = async ()=>{
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "If you confirm then user will be deleteed",
                icon: "",
                showCancelButton: true,
                confirmButtonColor: "#22AB59",
                cancelButtonColor: "#d33",
                confirmButtonText: " confirm",
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/delete/user/${user._id}`);
                    console.log(res.data)
                    refetch()
                }
              });
          } catch (error) {
            console.error("Failed to delete user", error);
            toast.error( `Failed to delete user for ${user.name}`)
          }
        };

    const handleRoleChange = async (event) => {
        const newRole = event.target.value;
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
          if (res.data.modifiedCount > 0) {
            setSelectedRole(newRole);
            refetch();
            toast.success(`${user?.name} is now a ${newRole}!`)
          }
        } catch (error) {
          console.error("Failed to update role", error);
          toast.error( `Failed to update role for ${user?.name}`)
        }
      };
      
    return (
        <tr>
          <th></th>
          <td>{user?.name}</td>
          <td>{user?.email}</td>
          <td>{user?.role}</td>
          <td>
          <div className="">
      <select value={selectedRole} onChange={handleRoleChange} className="dropdown border border-gray-600 bg-gray-100 px-3 py-2  text-center rounded-lg">
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
    </div>
          </td>
          <td>
            <button
            onClick={handleDeleteUser}
              className="bg-red-300 flex justify-center items-center px-3 py-2 rounded-lg"
            >
              <p className="text-gray-700">Delete</p>
            </button>
          </td>
        </tr>
    );
};

export default ManageUsersTable;