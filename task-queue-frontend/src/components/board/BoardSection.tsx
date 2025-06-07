import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableTaskItem from "./SortableTaskItem";
import type { Task } from "../../pages/BoardSectionList";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  addTask,
  removeColumn,
  renameBoardColumn,
} from "../../redux/boardReducer/action";
import { v4 as uuidv4 } from "uuid";
import Modal from "../common/Modal";

import { BiTrash } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import type { Auth } from "../../redux/authReducer/authReducer";

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const dispatch = useDispatch<AppDispatch>();
  const auth:Auth = useSelector((state:any)=> state.authReducer)
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const addNewTask = () => {
    let newTask: Task = {
      id: uuidv4(),
      title: "Add title",
      status: id,
      description: "",
      dueDate:'',
      createdBy:{id:auth.user?.id, name:`${auth.user?.firstName} ${auth.user?.lastName}`}
    };
    dispatch(addTask(newTask));
  };

  const [currentTile, setCurrentTitle] = useState<string>(title);
  const handleTitleChange = (e: any) => {
    let newtitle: string = e.target.value;
    setCurrentTitle(newtitle);
    dispatch(renameBoardColumn({ id: id, newName: newtitle }));
  };

  const handleRemoveColumn = () => {
    dispatch(removeColumn(id));
  };
  return (
    <div className="w-[400px] h-fit bg-gray-300 rounded-lg p-2 flex flex-col gap-5">
      <div className="w-full flex justify-between">
        <input
          tabIndex={0}
          value={currentTile}
          onInput={(e) => handleTitleChange(e)}
          className="text-lg font-medium uppercase border-0 outline-0"
        />
        <button
          onClick={() => setConfirmationModalOpen(true)}
          className="w-fit p-1 rounded hover:bg-white transition-all cursor-pointer"
        >
          <BiTrash />
        </button>
      </div>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-3">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} id={task.id} assigneeUser={task.users}>
              <TaskItem task={task} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
      <div className="w-full">
        <button
          onClick={addNewTask}
          className="px-2 w-full text-md font-semibold text-center py-1 rounded-md cursor-pointer hover:bg-white transition-all"
        >
          Add Task
        </button>
      </div>

      <Modal
        open={confirmationModalOpen}
        title="Confirm"
        handleCloseModal={setConfirmationModalOpen}
        confirmation={true}
        submitHandler={handleRemoveColumn}
      >
        <div className="w-full flex justify-center flex-col">
          <div className="w-full flex justify-center text-5xl text-red-400">
            <IoWarningOutline />
          </div>
          <span className="text-lg text-center">
            Are you sure want to delete {title.toUpperCase()}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default BoardSection;
