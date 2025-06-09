import { useRef } from "react";
import type { Task } from "../../pages/BoardSectionList";
import { useSelector } from "react-redux";
import type { Auth } from "../../redux/authReducer/authReducer";

type TaskItemProps = {
  task: Task;
  clickHandler?: (task: Task) => void;
};

const tagColor: { [name: string]: string } = {
  high: "bg-red-300",
  medium: "bg-lime-300",
  low: "bg-purple-300 ",
};
const checkForMyTask = (userId: string, assigneeUsers: Array<any>) => {
  let isAssignTome = assigneeUsers.filter((user) => user.id === userId);
  return isAssignTome.length ? true : false;
};
const TaskItem = ({ task, clickHandler }: TaskItemProps) => {
  const auth: Auth = useSelector((state: any) => state.authReducer);

  const isAssignTome =
    auth.user?.id && task.users && checkForMyTask(auth.user?.id, task.users);
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
      <div className="w-full flex justify-between">
        {task.tag && (
          <div className={`w-fit px-2 rounded text-xs ${tagColor[task.tag]}`}>
            {task.tag.toUpperCase()}
          </div>
        )}
        {isAssignTome && (
          <div className="w-fit px-2 rounded text-xs bg-lime-400">My</div>
        )}
      </div>

      <span className="font-semibold max-w-full break-words whitespace-pre-wrap">
        {task.title}
      </span>
      <div className="max-w-full break-words whitespace-pre-wrap my-2">
        <p className="text-sm text-gray-700">{task.description}</p>
      </div>

      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          {task.dueDate && <span className="text-xs text-gray-500">Due date : {task.dueDate}</span>}
          {/* {task.dueDate && <span className="text-xs text-gray-500">Target: {task.dueDate}</span>} */}
        </div>
        <div>
          {task.users && (
            <div className="w-fit px-2 text-xs bg-blue-200 rounded">
              Assignee {task.users.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
