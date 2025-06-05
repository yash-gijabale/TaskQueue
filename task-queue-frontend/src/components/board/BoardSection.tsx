import React, { useState, type EventHandler } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableTaskItem from "./SortableTaskItem";
import type { Task } from "../../pages/BoardSectionList";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { addTask, renameBoardColumn } from "../../redux/boardReducer/action";
import { v4 as uuidv4 } from "uuid";

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

  const addNewTask = () => {
    let newTask: Task = {
      id: uuidv4(),
      title: "Add title",
      status: id,
      description: "test",
    };
    dispatch(addTask(newTask));
  };

  const [currentTile, setCurrentTitle] = useState<string>(title)
  const handleTitleChange = (e:any) =>{
    let newtitle:string = e.target.value
    setCurrentTitle(newtitle)
    dispatch(renameBoardColumn({oldName:title, newName:newtitle}))
  }
  return (
    <div className="min-w-[300px] h-fit bg-gray-200 rounded-lg p-2 flex flex-col gap-5">
      <div>
        <input
          value={currentTile}
          onChange={(e)=>handleTitleChange(e)}
          className="text-lg font-medium uppercase border-0 outline-0"
        />
      </div>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-3">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} id={task.id}>
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
    </div>
  );
};

export default BoardSection;
