/* eslint-disable react/prop-types */
import { ImSpinner9 } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTasks = ({
  handleSubmit,
  startDate,
  setStartDate,
  loading,
  allusers,
  selectedUsers,
  setSelectedUsers,
}) => {
  // Function to toggle selection of a user
  const toggleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  console.log(allusers);
  return (
    <div className="">
      <h1 className="lg:text-2xl font-bold">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Task Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border borderfocus:outline-[#21d0ec] rounded-md "
                name="task_title"
                id="name"
                type="text"
                placeholder="Task Title"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="submission_info"
                  className="block text-gray-600"
                >
                  Users
                </label>
                <details className="dropdown space-y-1 text-sm">
                <summary className="w-full px-4 py-3 text-gray-800 border borderfocus:outline-[#21d0ec] rounded-md ">Select user</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-28 overflow-y-auto">
                  <li>
                  {allusers?.filter(e=>e.role === "User").map((user, idx) => (
                    <label key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        value={user.email}
                        checked={selectedUsers.includes(user.email)}
                        onChange={() => toggleUserSelection(user.email)}
                        className="form-checkbox h-5 w-5 textborder border-gray-300 rounded-md focus:ring-[#21d0ec]"
                      />
                      <span className="ml-2 text-gray-700">{user.email}</span>
                    </label>
                  ))}
                  </li>
                  </ul>
                </details>
              </div>

              <div className="space-y-1 text-sm">
                <label
                  htmlFor="completion_date"
                  className="block text-gray-600"
                >
                  Completion Date
                </label>

                <DatePicker
                  className="w-full px-4 py-3 text-gray-800 border borderfocus:outline-[#21d0ec] rounded-md"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="task_detail" className="block text-gray-600">
                Task Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:[#2de576] w-full h-32 px-4 py-3 text-gray-800  border borderfocus:outline-[#21d0ec] "
                name="description"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#21d0ec]"
        >
          {loading ? (
            <ImSpinner9 className="animate-spin m-auto" />
          ) : (
            " Add Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
