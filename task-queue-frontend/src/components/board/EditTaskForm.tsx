import React from "react";
import type { Tags, Task } from "../../pages/BoardSectionList";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { removeTask } from "../../redux/boardReducer/action";
import { BiTrash } from "react-icons/bi";
import type { User } from "../../redux/userReducer/userReducer";

interface EditTaskFormProps {
  task: Task;
  setActiveTask: React.Dispatch<React.SetStateAction<any>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<any>>;
}

const tags: Array<Tags> = ["high", "medium", "low"];

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  setActiveTask,
  setEditModalOpen,
}) => {
  const users: User[] = useSelector((state: any) => state.userReducer);

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
          onClick={handleRemoveTask}
        >
          <BiTrash /> Remove
        </span>
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
          <div className="w-full flex flex-col">
            <label>Priority</label>
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
                    {tag.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-full">
          <label>Assign users</label>
          <div className="w-full  flex gap-2">
            {users.map((user: User, ind) => {
              return (
                <label
                  key={ind}
                  className="inline-flex space-x-1 cursor-pointer text-sm px-2 p-1 items-center bg-blue-200 rounded"
                >
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={
                      task.users?.find((u) => u.id === user.id)?.id === user.id
                    }
                    onChange={(e) =>
                      setActiveTask((prev: Task) => {
                        if (e.target.checked) {
                          let user = users.find(
                            (u: User) => u.id === e.target.value
                          );
                          if (user) {
                            return {
                              ...prev,
                              users: prev.users
                                ? [
                                    ...prev.users,
                                    {
                                      id: user.id,
                                      name: `${user.firstName} ${user.lastName}`,
                                    },
                                  ]
                                : [],
                            };
                          }
                        } else {
                          return {
                            ...prev,
                            users: prev.users?.filter(
                              (u) => u.id !== e.target.value
                            ),
                          };
                        }
                      })
                    }
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
