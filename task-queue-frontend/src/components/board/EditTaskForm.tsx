import React from "react";
import type { Tags, Task } from "../../pages/BoardSectionList";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { removeTask } from "../../redux/boardReducer/action";
import { BiTrash } from "react-icons/bi";

interface EditTaskFormProps {
  task: Task;
  setActiveTask: React.Dispatch<React.SetStateAction<any>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<any>>;
}

const tags: Array<Tags> = ["Bug", "Enhancement", "Feature"];
const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  setActiveTask,
  setEditModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveTask = () => {
    dispatch(removeTask(task));
    setEditModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="full flex justify-end">
        <span
        className="flex gap-1 items-center text-red-500 px-2 cursor-pointer text-sm rounded-lg hover:bg-red-100 hover:text-red-800"
         onClick={handleRemoveTask}><BiTrash /> Remove</span>
      </div>
      <form className="w-full flex flex-col gap-5">
        <div className="full flex flex-col">
          <label>Task title</label>
          <input
            type="text"
            placeholder="Task title"
            value={task && task.title}
            onChange={(e) =>
              setActiveTask((prev: any) => ({ ...prev, title: e.target.value }))
            }
            className="p-2 rounded outline-blue-500 border-1 border-gray-400"
          ></input>
        </div>
        <div className="full flex flex-col">
          <label>Board Description</label>
          <textarea
            placeholder="Board description"
            name="boardDesc"
            value={task && task.description}
            rows={5}
            onChange={(e) =>
              setActiveTask((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="p-2  rounded outline-blue-500  border-1 border-gray-400"
          ></textarea>
        </div>

        <div className="w-full flex space-x-1 items-end">
          <div className="w-1/2 flex flex-col">
            <label>Add tag</label>
            <select
              defaultValue={task.tag}
              onChange={(e) =>
                setActiveTask((prev: any) => ({
                  ...prev,
                  tag: e.target.value,
                }))
              }
              className="p-2  rounded outline-blue-500  border-1 border-gray-400"
            >
              <option></option>
              {tags.map((tag: Tags, ind) => {
                return (
                  <option key={ind} value={tag}>
                    {tag}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
