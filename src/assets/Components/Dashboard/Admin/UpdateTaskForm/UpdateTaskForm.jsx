/* eslint-disable react/prop-types */

import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const UpdateTaskForm = ({
    handleSubmit,
    taskData,
    setTaskData,
  }) => {
console.log(taskData)
    const [startDate, setStartDate] = useState(new Date());
    return (
      <div className='w-full flex flex-col  text-gray-800 rounded-xl bg-gray-50'>
        <form onSubmit={handleSubmit}>
          <div className=''>
            
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Task Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border focus:outline-[#21d0ec] rounded-md '
                name='title'
                id='title'
                type='text'
                value={taskData?.task_title}
                onChange={e =>
                  setTaskData({ ...taskData, task_title: e.target.value })
                }
                placeholder='Title'
                required
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              

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
  
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
              Task Description
              </label>
  
              <textarea
                id='description'
                value={taskData?.description}
                onChange={e =>
                  setTaskData({ ...taskData, task_detail: e.target.value })
                }
                className='block rounded-md focus:[#52e18b] w-full h-32 px-4 py-3 text-gray-800  border focus:outline-[#21d0ec] '
                name='description'
              ></textarea>
            </div>
          </div>
  
          <button
            type='submit'
            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#21d0ec]'
          >
            Update
          </button>
        </form>
      </div>
    )
  }
  
  export default UpdateTaskForm