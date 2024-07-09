import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import AdminTaskRow from "./AdminTaskRow";
import useAuth from "../../../Hook/useAuth";

const AdminTaskList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   Fetch tasks Data
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alltask", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);

      return data;
    },
  });

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/tasks/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully deleted.");
      refetch();
    },
  });

  //  Handle Delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div
        className="container lg:pt-10 mx-auto px-4 sm:px-8"
      >
        <div className="py-8 pt-20">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Task Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Users
                    </th>
                    <th scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Completion Date
                    </th>
                    <th className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}

                  {tasks?.map((task) => (
                    <AdminTaskRow
                      key={task._id}
                      task={task}
                      handleDelete={handleDelete}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTaskList;
