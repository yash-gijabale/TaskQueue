import { useRef } from "react";
import type { Tags, Task } from "../../pages/BoardSectionList";

type TaskItemProps = {
  task: Task;
  clickHandler?: (task: Task) => void;
};

const tagColor: { [name: string]: string } = {
  Bug: "bg-red-300",
  Feature: "bg-lime-300",
  Enhancement: "bg-purple-300 ",
};

const TaskItem = ({ task, clickHandler }: TaskItemProps) => {
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = false;
  };

  const handlePointerMove = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) {
      clickHandler && clickHandler(task);
    }
  };
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="w-full p-2 bg-white rounded-md cursor-grab"
    >
      {task.tag && (
        <div className={`w-fit px-2 rounded text-sm ${tagColor[task.tag]}`}>{task.tag}</div>
      )}
      <span className="font-semibold">{task.title}</span>
      <div className="w-full">
        <span>{task.description}</span>
      </div>
    </div>
  );
};

export default TaskItem;
